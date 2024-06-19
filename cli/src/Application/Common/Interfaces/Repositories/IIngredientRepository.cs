using Taplist.Domain.Entities;

namespace Taplist.Application.Common.Interfaces.Repositories;

public interface IIngredientRepository : IAggregateRepository<Ingredient, string>
{
    Task<Ingredient?> GetByNameAsync(string name, CancellationToken cancel = default);
}
