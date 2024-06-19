using FluentValidation;
using MediatR;
using Taplist.Application.Common.Interfaces.Repositories;
using Taplist.Application.Common.Models;
using Taplist.Domain.Exceptions;

namespace Taplist.Application.Recipes.Commands;

public class AddIngredientRequest : IRequest
{
    public string RecipeId { get; set; } = "";

    public IngredientDto Ingredient { get; set; } = new();
}

public class AddIngredientCommand : IRequestHandler<AddIngredientRequest>
{
    private readonly IIngredientRepository _ingredientRepository;
    private readonly IRecipeRepository _recipeRepository;

    public AddIngredientCommand(IRecipeRepository recipeRepository, IIngredientRepository ingredientRepository)
    {
        _recipeRepository = recipeRepository;
        _ingredientRepository = ingredientRepository;
    }

    /// <inheritdoc />
    public async Task Handle(AddIngredientRequest request, CancellationToken cancel)
    {
        var recipe = await _recipeRepository.GetByIdAsync(request.RecipeId, cancel);
        if (recipe == null)
        {
            throw new NotFoundException("Could not find recipe");
        }

        var ingredient = await _ingredientRepository.GetByIdAsync(request.Ingredient.Id, cancel);
        if (ingredient == null)
        {
            throw new NotFoundException("Could not find ingredient");
        }

        recipe.AppendIngredient(
            ingredient,
            request.Ingredient.QuantityAsDouble!.Value,
            request.Ingredient.UnitAsEnum,
            request.Ingredient.Comment);
        await _recipeRepository.SaveAsync(recipe, cancel);
    }
}

public class AddIngredientRequestValidator : AbstractValidator<AddIngredientRequest>
{
    public AddIngredientRequestValidator()
    {
        RuleFor(x => x.Ingredient.QuantityAsDouble).NotNull();
        RuleFor(x => x.Ingredient.UnitAsEnum).NotNull();
    }
}
