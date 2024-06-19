using Taplist.Domain.Entities;

namespace Taplist.Application.Common.Interfaces.Repositories;

public interface IRecipeRepository : IAggregateRepository<Recipe, string>
{
}
