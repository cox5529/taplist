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
    public string Unit { get; private set; } = "Unit";

    [FirestoreProperty("instruction")]
    public string? Instruction { get; private set; }

    public float VolumeOunces
    {
        get
        {
            return Unit switch
            {
                "Dash" => 0.02f,
                "Teaspoon" => 0.167f,
                "Tablespoon" => 0.5f,
                "Ounce" => 1,
                "Handful" => 0.25f,
                "Leaf" => 0.05f,
                "Barspoon" => 0.035f,
                _ => 0
            };
        }
    }

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
