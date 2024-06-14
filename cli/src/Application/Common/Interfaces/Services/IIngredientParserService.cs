using Taplist.Application.Common.Models;

namespace Taplist.Application.Common.Interfaces.Services;

public interface IIngredientParserService
{
    Task<IngredientDto?> ParseIngredientAsync(string ingredient, CancellationToken cancel = default);
}
