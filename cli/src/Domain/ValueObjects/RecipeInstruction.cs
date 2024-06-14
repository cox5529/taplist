using Taplist.Domain.Entities;

namespace Taplist.Domain.ValueObjects;

public class RecipeInstruction
{
    public Guid RecipeId { get; private set; }
    
    public int Order { get; private set; }

    public string Content { get; private set; } = "";

    private RecipeInstruction()
    {
    }

    public RecipeInstruction(Recipe recipe, int order, string content)
    {
        RecipeId = recipe.Id;
        Order = order;
        Content = content;
    }

    public void SetOrder(int order)
    {
        Order = order;
    }
}
