using FluentValidation;
using MediatR;
using Taplist.Application.Common.Interfaces.Repositories;
using Taplist.Application.Recipes.Queries;

namespace Taplist.Application.Recipes.Commands;

public record ComputeMetadata : IRequest
{
}

public class ComputeMetadataHandler : IRequestHandler<ComputeMetadata>
{
    private readonly IMediator _mediator;
    private readonly IRecipeRepository _recipeRepository;
    private readonly IIngredientRepository _ingredientRepository;

    public ComputeMetadataHandler(
        IMediator mediator,
        IRecipeRepository recipeRepository,
        IIngredientRepository ingredientRepository)
    {
        _mediator = mediator;
        _recipeRepository = recipeRepository;
        _ingredientRepository = ingredientRepository;
    }

    public async Task Handle(ComputeMetadata request, CancellationToken cancel)
    {
        var recipes = (await _recipeRepository.GetAllAsync(cancel)).ToList();
        var ingredients = await _ingredientRepository.GetAllIngredientsAsync(cancel);

        await _mediator.Send(
            new ComputeSimilarRecipes
            {
                Ingredients = ingredients,
                Recipes = recipes
            },
            cancel);

        foreach (var recipe in recipes)
        {
            await _recipeRepository.SaveAsync(recipe, cancel);
        }
    }
}

public class ComputeMetadataValidator : AbstractValidator<ComputeMetadata>
{
    public ComputeMetadataValidator()
    {
    }
}
