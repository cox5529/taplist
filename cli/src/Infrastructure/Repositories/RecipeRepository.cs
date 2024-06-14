using Taplist.Application.Common.Interfaces.Repositories;
using Taplist.Domain.Entities;

namespace Taplist.Infrastructure.Repositories;

public class RecipeRepository : IRecipeRepository
{
    /// <inheritdoc />
    public Task<Recipe> GetByIdRequiredAsync(Guid id, CancellationToken cancel = default)
    {
        throw new NotImplementedException();
    }

    /// <inheritdoc />
    public Task<Recipe?> GetByIdAsync(Guid id, CancellationToken cancel = default)
    {
        throw new NotImplementedException();
    }

    /// <inheritdoc />
    public Task<Guid> CreateAsync(Recipe entity, CancellationToken cancel = default)
    {
        throw new NotImplementedException();
    }

    /// <inheritdoc />
    public Task DeleteByIdAsync(Guid id, CancellationToken cancel = default)
    {
        throw new NotImplementedException();
    }

    /// <inheritdoc />
    public Task SaveAsync(Recipe entity, CancellationToken cancel = default)
    {
        throw new NotImplementedException();
    }
}
