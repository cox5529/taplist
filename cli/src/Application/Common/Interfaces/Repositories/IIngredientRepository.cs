using Taplist.Domain.Entities;

namespace Taplist.Application.Common.Interfaces.Repositories;

public interface IIngredientRepository : IAggregateRepository<Ingredient, Guid>
{
    Task<Ingredient?> GetByNameAsync(string name, CancellationToken cancel = default);
}
