using Google.Cloud.Firestore;
using Newtonsoft.Json;
using Taplist.Application.Common.Interfaces.Repositories;
using Taplist.Domain.Entities;

namespace Taplist.Infrastructure.Repositories;

public class IngredientRepository : IIngredientRepository
{
    private readonly CollectionReference _collection;

    public IngredientRepository(FirestoreDb db)
    {
        _collection = db.Collection("ingredients");
    }

    /// <inheritdoc />
    public Task<Ingredient> GetByIdRequiredAsync(string id, CancellationToken cancel = default)
    {
        throw new NotImplementedException();
    }

    /// <inheritdoc />
    public Task<Ingredient?> GetByIdAsync(string id, CancellationToken cancel = default)
    {
        throw new NotImplementedException();
    }

    /// <inheritdoc />
    public async Task<string> CreateAsync(Ingredient entity, CancellationToken cancel = default)
    {
        await _collection.Document(entity.Id).CreateAsync(entity, cancel);
        return entity.Id;
    }

    /// <inheritdoc />
    public Task DeleteByIdAsync(string id, CancellationToken cancel = default)
    {
        throw new NotImplementedException();
    }

    /// <inheritdoc />
    public Task SaveAsync(Ingredient entity, CancellationToken cancel = default)
    {
        throw new NotImplementedException();
    }

    /// <inheritdoc />
    public async Task<Ingredient?> GetByNameAsync(string name, CancellationToken cancel = default)
    {
        var queryResult = await _collection.WhereEqualTo("name", name).Limit(1).GetSnapshotAsync(cancel);
        var result = queryResult.Count > 0 ? queryResult[0] : null;
        return result?.ConvertTo<Ingredient>();
    }
}
