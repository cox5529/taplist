using System.Diagnostics;
using System.Text.Json;
using System.Web;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Taplist.Application.Common.Interfaces.Services;
using Taplist.Application.Common.Models;
using Taplist.Infrastructure.Settings;

namespace Taplist.Infrastructure.Services;

public class IngredientParserService : IIngredientParserService
{
    private readonly ILogger<IngredientParserService> _logger;
    private readonly IngredientParserSettings _settings;

    public IngredientParserService(ILogger<IngredientParserService> logger, IOptions<IngredientParserSettings> settings)
    {
        _logger = logger;
        _settings = settings.Value;
    }

    /// <inheritdoc />
    public async Task<IngredientDto?> ParseIngredientAsync(string ingredient, CancellationToken cancel = default)
    {
        _logger.LogInformation("Requesting ingredients for input: {Input}", ingredient);
        var processStartInfo = new ProcessStartInfo("python", $"{_settings.Path} \"{ingredient}\"")
        {
            RedirectStandardOutput = true
        };
        var process = Process.Start(processStartInfo);
        if (process == null)
        {
            _logger.LogWarning("Failed to parse ingredient '{ingredient}'", ingredient);
            return null;
        }

        await process.WaitForExitAsync(cancel);
        if (process.ExitCode != 0)
        {
            _logger.LogWarning("Failed to parse ingredient '{ingredient}'", ingredient);
            return null;
        }

        var json = await process.StandardOutput.ReadToEndAsync(cancel);
        var result = JsonSerializer.Deserialize<IngredientDto>(
            json,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        _logger.LogInformation("Received parsed ingredient");
        return result;
    }
}
