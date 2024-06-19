using Google.Cloud.Firestore;
using Taplist.Domain.Common;

namespace Taplist.Domain.Entities;

[FirestoreData]
public class Ingredient : BaseEntity<string>
{
    [FirestoreProperty("name")]
    public string Name { get; private set; } = "";

    public Ingredient()
    {
    }

    public Ingredient(string name)
    {
        Id = Guid.NewGuid().ToString();
        Name = name;
    }
}
