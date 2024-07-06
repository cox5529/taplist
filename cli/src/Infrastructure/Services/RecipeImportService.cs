using HtmlAgilityPack;
using MediatR;
using Newtonsoft.Json.Linq;
using Schema.NET;
using Taplist.Application.Common.Interfaces.Services;
using Taplist.Application.Ingredients.Commands;
using Taplist.Domain.Exceptions;
using Recipe = Taplist.Domain.Entities.Recipe;

namespace Taplist.Infrastructure.Services;

public class RecipeImportService : IRecipeImportService
{
    private readonly HttpClient _client;
    private readonly IJsonLdService _jsonLdService;
    private readonly IIngredientParserService _ingredientParser;
    private readonly IMediator _mediator;

    public RecipeImportService(HttpClient client, IJsonLdService jsonLdService, IIngredientParserService ingredientParser, IMediator mediator)
    {
        _client = client;
        _jsonLdService = jsonLdService;
        _ingredientParser = ingredientParser;
        _mediator = mediator;
    }

    /// <inheritdoc />
    public async Task<Recipe> ImportRecipeAsync(string url, CancellationToken cancel = default)
    {
        HttpResponseMessage response;
        try
        {
            response = await _client.GetAsync(url, cancel);
        }
        catch
        {
            throw new BadRequestException("External site did not respond with a success");
        }

        if (!response.IsSuccessStatusCode)
        {
            throw new BadRequestException("External site did not respond with a success");
        }

        var body = await response.Content.ReadAsStringAsync(cancel);
        var document = new HtmlDocument();
        document.LoadHtml(body);

        var tasks = document.DocumentNode.Descendants("script")
                            .Where(x => x.Attributes["type"]?.Value == "application/ld+json")
                            .Select(x => ParseRecipes(x.InnerText))
                            .ToList();

        var jsonEntries = await Task.WhenAll(tasks);
        var recipes = jsonEntries.SelectMany(x => x).ToList();

        if (!recipes.Any())
        {
            throw new BadRequestException("External site does not contain a recipe");
        }

        return recipes.First();
    }

    private async Task<IEnumerable<Recipe>> ParseRecipes(string script)
    {
        var json = JToken.Parse(script);
        var recipe = await ParseRecipe(json);
        return recipe == null ? new List<Recipe>() : new List<Recipe> { recipe };
    }

    private async Task<Recipe?> ParseRecipe(JToken json)
    {
        var schemaRecipe = _jsonLdService.Frame(json);
        if (schemaRecipe == null)
        {
            return null;
        }

        var recipe = new Recipe(schemaRecipe.Name.First());
        recipe.SetDescription(schemaRecipe.Description);

        foreach (var ingredient in schemaRecipe.RecipeIngredient)
        {
            var parsedIngredient = await _ingredientParser.ParseIngredientAsync(ingredient);
            if (parsedIngredient == null)
            {
                continue;
            }

            var dbIngredient = await _mediator.Send(new CreateIngredient { Ingredient = parsedIngredient });
            recipe.AppendIngredient(
                dbIngredient,
                parsedIngredient.QuantityAsDouble ?? 1,
                parsedIngredient.UnitAsEnum,
                parsedIngredient.Comment);
        }

        var description = string.Join(", ", recipe.Ingredients.Select(x => x.Ingredient?.Name));
        recipe.SetDescription(description);

        if (schemaRecipe.RecipeInstructions.HasValue2)
        {
            foreach (var schemaSection in schemaRecipe.RecipeInstructions.Value2)
            {
                if (schemaSection is HowToStep howToStep)
                {
                    recipe.AppendInstruction(howToStep!.Text.First());
                }
            }
        }
        
        return recipe;
    }
}
