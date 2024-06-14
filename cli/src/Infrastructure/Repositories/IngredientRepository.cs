using Taplist.Application.Common.Interfaces.Repositories;
using Taplist.Domain.Entities;

namespace Taplist.Infrastructure.Repositories;

public class IngredientRepository : IIngredientRepository
{
    /// <inheritdoc />
    public Task<Ingredient> GetByIdRequiredAsync(Guid id, CancellationToken cancel = default)
    {
        throw new NotImplementedException();
    }

    /// <inheritdoc />
    public Task<Ingredient?> GetByIdAsync(Guid id, CancellationToken cancel = default)
    {
        throw new NotImplementedException();
    }

    /// <inheritdoc />
    public Task<Guid> CreateAsync(Ingredient entity, CancellationToken cancel = default)
    {
        throw new NotImplementedException();
    }

    /// <inheritdoc />
    public Task DeleteByIdAsync(Guid id, CancellationToken cancel = default)
    {
        throw new NotImplementedException();
    }

    /// <inheritdoc />
    public Task SaveAsync(Ingredient entity, CancellationToken cancel = default)
    {
        throw new NotImplementedException();
    }

    /// <inheritdoc />
    public Task<Ingredient?> GetByNameAsync(string name, CancellationToken cancel = default)
    {
        throw new NotImplementedException();
    }
}
