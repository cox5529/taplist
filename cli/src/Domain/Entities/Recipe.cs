using Taplist.Domain.Common;
using Taplist.Domain.Enums;
using Taplist.Domain.Exceptions;
using Taplist.Domain.ValueObjects;

namespace Taplist.Domain.Entities;

public class Recipe : BaseEntity<Guid>
{
    public string Name { get; private set; } = "";

    public string? Description { get; private set; }
    
    public virtual IList<RecipeIngredient> Ingredients { get; private set; } = new List<RecipeIngredient>();

    public virtual IList<RecipeInstruction> Instructions { get; private set; } = new List<RecipeInstruction>();

    private Recipe()
    {
    }

    public Recipe(string name)
    {
        Id = Guid.NewGuid();
        Name = name;
    }

    public void SetDescription(string? description)
    {
        Description = description;
    }

    public void AppendIngredient(Ingredient ingredient, double quantity, Units unit, string? instruction = null)
    {
        var recipeIngredient = new RecipeIngredient(this, ingredient, Ingredients.Count, quantity, unit, instruction);
        Ingredients.Add(recipeIngredient);
    }

    public void RemoveIngredient(int order)
    {
        var ingredient = Ingredients.FirstOrDefault(x => x.Order == order);
        if (ingredient == null)
        {
            throw new NotFoundException("Could not find ingredient in this recipe");
        }

        Ingredients.Remove(ingredient);
    }

    public void ReorderIngredients(IEnumerable<int> newOrder)
    {
        var allExist = Ingredients.All(x => newOrder.Contains(x.Order));
        if (!allExist)
        {
            throw new BadRequestException("NewOrder does not contain all existing ingredients");
        }

        Ingredients = newOrder.Select(x => Ingredients.First(i => i.Order == x)).ToList();
        for (var i = 0; i < Ingredients.Count; i++)
        {
            Ingredients[i].SetOrder(i);
        }
    }

    public void ReorderInstructions(IEnumerable<int> newOrder)
    {
        var allExist = Instructions.All(x => newOrder.Contains(x.Order));
        if (!allExist)
        {
            throw new BadRequestException("NewOrder does not contain all existing ingredients");
        }

        Instructions = newOrder.Select(x => Instructions.First(i => i.Order == x)).ToList();
        for (var i = 0; i < Instructions.Count; i++)
        {
            Instructions[i].SetOrder(i);
        }
    }

    public void AppendInstruction(string content)
    {
        var instruction = new RecipeInstruction(this, Instructions.Count, content);
        Instructions.Add(instruction);
    }

    public void RemoveInstruction(int instructionId)
    {
        var section = Instructions.FirstOrDefault(x => x.Order == instructionId);
        if (section == null)
        {
            throw new NotFoundException("Could not find instruction in this recipe section");
        }

        Instructions.Remove(section);
    }
}
