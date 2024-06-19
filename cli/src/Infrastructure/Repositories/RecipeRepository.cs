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
    public Task SaveAsync(Recipe entity, CancellationToken cancel = default)
    {
        throw new NotImplementedException();
    }
}
