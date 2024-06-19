using MediatR;
using Taplist.Application.Common.Interfaces.Repositories;
using Taplist.Application.Common.Models;
using Taplist.Domain.Entities;

namespace Taplist.Application.Ingredients.Commands;

public class CreateIngredient : IRequest<Ingredient>
{
    public IngredientDto Ingredient { get; set; } = new();
}

public class CreateIngredientCommand : IRequestHandler<CreateIngredient, Ingredient>
{
    private readonly IIngredientRepository _ingredientRepository;

    public CreateIngredientCommand(IIngredientRepository ingredientRepository)
    {
        _ingredientRepository = ingredientRepository;
    }

    /// <inheritdoc />
    public async Task<Ingredient> Handle(CreateIngredient request, CancellationToken cancel)
    {
        var ingredient = await _ingredientRepository.GetByNameAsync(request.Ingredient.Name, cancel);
        if (ingredient != null)
        {
            return ingredient;
        }

        ingredient = new Ingredient(request.Ingredient.Name);
        var id = await _ingredientRepository.CreateAsync(ingredient, cancel);
        ingredient.Id = id;
        return ingredient;
    }
}

