namespace Taplist.Application.Common.Interfaces.Services;

public interface IVectorService
{
    Task FilterAndSaveVectors(string[] words, CancellationToken cancel = default);
    
    Task<float[]> GetVectorAsync(string word, CancellationToken cancel = default);

    float Similarity(float[] a, float[] b);

    float[] Combine(IEnumerable<float[]> vectors);
}
