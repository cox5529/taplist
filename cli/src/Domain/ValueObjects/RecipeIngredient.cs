using Google.Cloud.Firestore;
using Taplist.Domain.Entities;
using Taplist.Domain.Enums;

namespace Taplist.Domain.ValueObjects;

[FirestoreData]
public class RecipeIngredient
{
    [FirestoreProperty("ingredientId")]
    public string IngredientId { get; private set; } = "";

    public Ingredient? Ingredient { get; private set; }

    [FirestoreProperty("quantity")]
    public double Quantity { get; private set; }

    [FirestoreProperty("unit")]
    public string Unit { get; private set; } = "unit";


    [FirestoreProperty("instruction")]
    public string? Instruction { get; private set; }

    private RecipeIngredient()
    {
    }

    public RecipeIngredient(Ingredient ingredient, double quantity, Units unit, string? instruction = null)
    {
        Ingredient = ingredient;
        IngredientId = ingredient.Id;

        Quantity = quantity;
        Unit = unit.ToString();
        Instruction = instruction;
    }
}
