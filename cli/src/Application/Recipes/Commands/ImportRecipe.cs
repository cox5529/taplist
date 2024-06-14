using FastEndpoints;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Taplist.Application.Common.Interfaces.Repositories;
using Taplist.Application.Common.Interfaces.Services;

namespace Taplist.Application.Recipes.Commands;

public class ImportRecipeRequest
{
    public string Url { get; set; } = "";
}

public class ImportRecipeCommand : Endpoint<ImportRecipeRequest>
{
    private readonly IRecipeImportService _recipeImportService;
    private readonly IRecipeRepository _recipeRepository;

    public ImportRecipeCommand(
        IRecipeImportService recipeImportService,
        IRecipeRepository recipeRepository)
    {
        _recipeImportService = recipeImportService;
        _recipeRepository = recipeRepository;
    }

    public override void Configure()
    {
        Post("recipes/import");
        Description(b => b.Produces(204));
    }

    public override async Task HandleAsync(ImportRecipeRequest request, CancellationToken cancel)
    {
        var recipe = await _recipeImportService.ImportRecipeAsync(request.Url, cancel);
        await _recipeRepository.CreateAsync(recipe, cancel);
    }
}

public class ImportRecipeRequestValidator : Validator<ImportRecipeRequest>
{
    public ImportRecipeRequestValidator()
    {
        RuleFor(x => x.Url)
           .NotEmpty()
           .Matches(@"^(http(s)?:\/\/.*)$")
           .WithMessage("This is not a valid URL");
    }
}
