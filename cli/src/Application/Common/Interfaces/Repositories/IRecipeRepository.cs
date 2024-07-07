using Taplist.Domain.Entities;

namespace Taplist.Application.Common.Interfaces.Repositories;

public interface IRecipeRepository : IAggregateRepository<Recipe, string>
{
    Task<IEnumerable<Recipe>> GetAllAsync(CancellationToken cancel = default);
}
