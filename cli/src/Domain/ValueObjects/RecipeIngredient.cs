using Taplist.Domain.Entities;
using Taplist.Domain.Enums;

namespace Taplist.Domain.ValueObjects;

public class RecipeIngredient
{
    public Guid RecipeId { get; private set; }

    public Recipe? Recipe { get; private set; }

    public Guid IngredientId { get; private set; }

    public Ingredient? Ingredient { get; private set; }

    public int Order { get; private set; }

    public double Quantity { get; private set; }

    public Units Unit { get; private set; }

    public string? Instruction { get; private set; }

    private RecipeIngredient()
    {
    }

    public RecipeIngredient(
        Recipe recipe,
        Ingredient ingredient,
        int order,
        double quantity,
        Units unit,
        string? instruction = null)
    {
        Recipe = recipe;
        RecipeId = recipe.Id;
        Ingredient = ingredient;
        IngredientId = ingredient.Id;

        Order = order;
        Quantity = quantity;
        Unit = unit;
        Instruction = instruction;
    }

    public void SetOrder(int order)
    {
        Order = order;
    }
}
