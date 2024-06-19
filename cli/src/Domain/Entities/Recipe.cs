using Google.Cloud.Firestore;
using Taplist.Domain.Common;
using Taplist.Domain.Enums;
using Taplist.Domain.Exceptions;
using Taplist.Domain.ValueObjects;

namespace Taplist.Domain.Entities;

[FirestoreData]
public class Recipe : BaseEntity<string>
{
    [FirestoreProperty("name")]
    public string Name { get; private set; } = "";

    [FirestoreProperty("description")]
    public string? Description { get; private set; }
    
    [FirestoreProperty("ingredients")]
    public virtual IList<RecipeIngredient> Ingredients { get; private set; } = new List<RecipeIngredient>();

    [FirestoreProperty("instructions")]
    public virtual IList<string> Instructions { get; private set; } = new List<string>();

    private Recipe()
    {
    }

    public Recipe(string name)
    {
        Id = Guid.NewGuid().ToString();
        Name = name;
    }

    public void SetDescription(string? description)
    {
        Description = description;
    }

    public void AppendIngredient(Ingredient ingredient, double quantity, Units unit, string? instruction = null)
    {
        var recipeIngredient = new RecipeIngredient(ingredient, quantity, unit, instruction);
        Ingredients.Add(recipeIngredient);
    }

    public void AppendInstruction(string content)
    {
        Instructions.Add(content);
    }
}
