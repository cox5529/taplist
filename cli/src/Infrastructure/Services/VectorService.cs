using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Taplist.Application.Common.Interfaces.Services;
using Taplist.Infrastructure.Settings;

namespace Taplist.Infrastructure.Services;

public class VectorService(IOptions<VectorSettings> settings, ILogger<VectorService> logger) : IVectorService
{
    private readonly ILogger<VectorService> _logger = logger;
    private readonly VectorSettings _settings = settings.Value;
    private Dictionary<string, float[]>? _vectors;

    private async Task LoadVectors(CancellationToken cancel = default)
    {
        _vectors = new Dictionary<string, float[]>();

        var path = _settings.VectorFileLocation;
        await foreach (var line in File.ReadLinesAsync(path, cancel))
        {
            var parts = line.Split(" ");
            var word = parts[0].ToLower();
            var vector = new float[300];
            for (var i = 0; i < 300; i++)
            {
                vector[i] = float.Parse(parts[i + 1]);
            }
            
            _vectors[word] = vector;
        }
    }

    /// <inheritdoc />
    public async Task FilterAndSaveVectors(string[] words, CancellationToken cancel = default)
    {
        if (_vectors == null)
        {
            await LoadVectors(cancel);
        }

        if (_vectors == null)
        {
            throw new NullReferenceException("Failed to initialize word vector array");
        }

        var usedVectors = words.ToDictionary(w => w, w => _vectors[w]);
        var vectorFileText = "";
        foreach (var (word, vector) in usedVectors)
        {
            vectorFileText += $"{word} {string.Join(" ", vector)}\n";
        }

        await File.WriteAllTextAsync($"{_settings.VectorFileLocation}.trim", vectorFileText, cancel);
    }

    /// <inheritdoc />
    public async Task<float[]> GetVectorAsync(string word, CancellationToken cancel = default)
    {
        if (_vectors == null)
        {
            await LoadVectors(cancel);
        }

        if (_vectors == null)
        {
            throw new NullReferenceException("Failed to initialize word vector array");
        }

        word = word.ToLower();
        return _vectors.TryGetValue(word, out var vector)
                   ? vector
                   : throw new NotSupportedException($"Could not find word vector for '{word}'");
    }

    /// <inheritdoc />
    public float Similarity(float[] a, float[] b)
    {
        var dot = Dot(a, b);
        return dot / (Magnitude(a) * Magnitude(b));
    }

    /// <inheritdoc />
    public float[] Combine(IEnumerable<float[]> vectors)
    {
        var vectorList = vectors.ToList();
        if (vectorList.Count == 0)
        {
            return [];
        }

        var length = vectorList.First().Length;
        var output = new float[length];
        for (var i = 0; i < length; i++)
        {
            output[i] = 0;
            foreach (var vector in vectorList)
            {
                output[i] += vector[i];
            }
        }

        var magnitude = Magnitude(output);
        for (var i = 0; i < length; i++)
        {
            output[i] /= magnitude;
        }

        return output;
    }

    private static float Dot(float[] a, float[] b)
    {
        if (a.Length != b.Length)
        {
            return -1;
        }

        return a.Select((t, i) => t * b[i]).Sum();
    }

    private static float Magnitude(float[] vector)
    {
        var sum = vector.Select(x => x * x).Sum();
        return (float) Math.Sqrt(sum);
    }
}
