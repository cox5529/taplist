using FluentValidation;
using MediatR;
using Taplist.Application.Common.Interfaces.Repositories;
using Taplist.Application.Common.Interfaces.Services;

namespace Taplist.Application.Recipes.Commands;

public class ImportRecipeRequest : IRequest
{
    public string Url { get; set; } = "";
}

public class ImportRecipeCommand : IRequestHandler<ImportRecipeRequest>
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

    /// <inheritdoc />
    public async Task Handle(ImportRecipeRequest request, CancellationToken cancel)
    {
        var recipe = await _recipeImportService.ImportRecipeAsync(request.Url, cancel);
        await _recipeRepository.CreateAsync(recipe, cancel);
    }
}

public class ImportRecipeRequestValidator : AbstractValidator<ImportRecipeRequest>
{
    public ImportRecipeRequestValidator()
    {
        RuleFor(x => x.Url)
           .NotEmpty()
           .Matches(@"^(http(s)?:\/\/.*)$")
           .WithMessage("This is not a valid URL");
    }
}
