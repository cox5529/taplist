using FastEndpoints;
using Taplist.Application.Common.Interfaces.Repositories;
using Taplist.Application.Common.Interfaces.Services;
using Taplist.Application.Common.Models;
using Taplist.Domain.Entities;

namespace Taplist.Application.Ingredients.Commands;

public class CreateIngredient : ICommand<Ingredient>
{
    public IngredientDto Ingredient { get; set; } = new();
}

public class CreateIngredientCommand : ICommandHandler<CreateIngredient, Ingredient>
{
    private readonly IIngredientRepository _ingredientRepository;

    public CreateIngredientCommand(IIngredientRepository ingredientRepository)
    {
        _ingredientRepository = ingredientRepository;
    }

    /// <inheritdoc />
    public async Task<Ingredient> ExecuteAsync(CreateIngredient command, CancellationToken cancel)
    {
        var ingredient = await _ingredientRepository.GetByNameAsync(command.Ingredient.Name, cancel);
        if (ingredient != null)
        {
            return ingredient;
        }

        ingredient = new Ingredient(command.Ingredient.Name);
        var id = await _ingredientRepository.CreateAsync(ingredient, cancel);
        ingredient.Id = id;
        return ingredient;
    }
}

