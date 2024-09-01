using Google.Cloud.Firestore;
using Taplist.Application.Common.Interfaces.Repositories;
using Taplist.Domain.Entities;

namespace Taplist.Infrastructure.Repositories;

public class RecipeRepository : IRecipeRepository
{
    private readonly CollectionReference _collection;

    public RecipeRepository(FirestoreDb db)
    {
        _collection = db.Collection("cocktails");
    }

    /// <inheritdoc />
    public Task<Recipe> GetByIdRequiredAsync(string id, CancellationToken cancel = default)
    {
        throw new NotImplementedException();
    }

    /// <inheritdoc />
    public Task<Recipe?> GetByIdAsync(string id, CancellationToken cancel = default)
    {
        throw new NotImplementedException();
    }

    /// <inheritdoc />
    public async Task<string> CreateAsync(Recipe entity, CancellationToken cancel = default)
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
    public async Task SaveAsync(Recipe entity, CancellationToken cancel = default)
    {
        if (entity.Ingredients.All(x => x.Unit == "Unit"))
        {
            throw new Exception($"Attempted to wipe units when saving {entity.Name}");
        }

        await _collection.Document(entity.Id).SetAsync(entity, cancellationToken: cancel);
    }

    /// <inheritdoc />
    public async Task<IEnumerable<Recipe>> GetAllAsync(CancellationToken cancel = default)
    {
        var queryResult = await _collection.GetSnapshotAsync(cancel);
        var result = queryResult.Documents.Select(x => x.ConvertTo<Recipe>());
        return result;
    }
}
