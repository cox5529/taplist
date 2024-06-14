using Taplist.Domain.Common;

namespace Taplist.Domain.Entities;

public class Ingredient : BaseEntity<Guid>
{
    public string Name { get; private set; } = "";

    private Ingredient()
    {
    }

    public Ingredient(string name)
    {
        Id = Guid.NewGuid();
        Name = name;
    }
}
