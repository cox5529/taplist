using System.Text.Json;
using System.Web;
using Microsoft.Extensions.Logging;
using Taplist.Application.Common.Interfaces.Services;
using Taplist.Application.Common.Models;

namespace Taplist.Infrastructure.Services;

public class IngredientParserService : IIngredientParserService
{
    private readonly ILogger<IngredientParserService> _logger;
    private readonly HttpClient _client;

    public IngredientParserService(HttpClient client, ILogger<IngredientParserService> logger)
    {
        _client = client;
        _logger = logger;
    }

    /// <inheritdoc />
    public async Task<IngredientDto?> ParseIngredientAsync(string ingredient, CancellationToken cancel = default)
    {
        _logger.LogInformation("Requesting ingredients for input: {Input}", ingredient);
        var response = await _client.GetAsync($"/?input={HttpUtility.UrlEncode(ingredient)}", cancel);
        if (!response.IsSuccessStatusCode)
        {
            return null;
        }

        var json = await response.Content.ReadAsStringAsync(cancel);
        var result = JsonSerializer.Deserialize<IngredientDto>(
            json,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        _logger.LogInformation("Received parsed ingredient");
        return result;
    }
}
