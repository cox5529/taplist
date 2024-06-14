using Taplist.Domain.Entities;

namespace Taplist.Application.Common.Interfaces.Services;

public interface IRecipeImportService
{
    Task<Recipe> ImportRecipeAsync(string url, CancellationToken cancel = default);
}
