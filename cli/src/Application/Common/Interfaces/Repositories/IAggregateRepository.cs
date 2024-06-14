using Taplist.Domain.Common;

namespace Taplist.Application.Common.Interfaces.Repositories;

public interface IAggregateRepository<T, TKey> where T : BaseEntity<TKey>
{
    Task<T> GetByIdRequiredAsync(TKey id, CancellationToken cancel = default);
    
    Task<T?> GetByIdAsync(TKey id, CancellationToken cancel = default);

    Task<TKey> CreateAsync(T entity, CancellationToken cancel = default);

    Task DeleteByIdAsync(TKey id, CancellationToken cancel = default);

    Task SaveAsync(T entity, CancellationToken cancel = default);
}
