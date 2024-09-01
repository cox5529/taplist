using FluentValidation;
using MediatR;
using Taplist.Application.Common.Interfaces.Services;
using Taplist.Application.Ingredients.Queries;
using Taplist.Domain.Entities;

namespace Taplist.Application.Recipes.Queries;

public record ComputeSimilarRecipes : IRequest
{
    public IEnumerable<Ingredient> Ingredients { get; set; } = new List<Ingredient>();

    public IEnumerable<Recipe> Recipes { get; set; } = new List<Recipe>();
}

public class ComputeSimilarRecipesHandler : IRequestHandler<ComputeSimilarRecipes>
{
    private readonly IMediator _mediator;
    private readonly IVectorService _vectorService;

    public ComputeSimilarRecipesHandler(IMediator mediator, IVectorService vectorService)
    {
        _mediator = mediator;
        _vectorService = vectorService;
    }

    public async Task Handle(ComputeSimilarRecipes request, CancellationToken cancel)
    {
        var recipes = request.Recipes.ToList();
        var recipeMissingIngredients = recipes.Where(recipe => recipe.Ingredients.All(i => i.Unit == "Unit")).ToList();
        if (recipeMissingIngredients.Count != 0)
        {
            throw new Exception($"Recipe {recipeMissingIngredients.First().Name} is missing ingredient labels");
        }

        var ingredientMapResponse = await _mediator.Send(
                                        new ComputeIngredientVectors { Ingredients = request.Ingredients },
                                        cancel);

        foreach (var recipeA in recipes)
        {
            var aVector = ComputeRecipeVector(ingredientMapResponse.IngredientMap, recipeA);

            foreach (var recipeB in recipes)
            {
                if (recipeA.Id == recipeB.Id)
                {
                    continue;
                }

                var bVector = ComputeRecipeVector(ingredientMapResponse.IngredientMap, recipeB);
                var similarity = _vectorService.Similarity(aVector, bVector);

                recipeA.SimilarRecipesMap[recipeB.Id] = similarity;
                recipeB.SimilarRecipesMap[recipeA.Id] = similarity;
            }
        }

        foreach (var recipe in recipes)
        {
            recipe.UpdateSimilarRecipes();
        }
    }

    private float[] ComputeRecipeVector(Dictionary<string, float[]> ingredientMap, Recipe recipe)
    {
        var ingredientVectors = recipe.Ingredients.Select(
            x => ingredientMap[x.IngredientId].Select(y => y * x.VolumeOunces).ToArray());
        return _vectorService.Combine(ingredientVectors);
    }
}

public class ComputeSimilarRecipesValidator : AbstractValidator<ComputeSimilarRecipes>
{
    public ComputeSimilarRecipesValidator()
    {
    }
}
