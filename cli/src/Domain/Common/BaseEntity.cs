﻿using System.ComponentModel.DataAnnotations.Schema;
using Google.Cloud.Firestore;

namespace Taplist.Domain.Common;

public abstract class BaseEntity<T>
{
    private readonly List<BaseEvent> _domainEvents = new();

    [FirestoreProperty("id")]
    public T Id { get; set; } = default!;

    [NotMapped]
    public IReadOnlyCollection<BaseEvent> DomainEvents => _domainEvents.AsReadOnly();

    public void AddDomainEvent(BaseEvent domainEvent)
    {
        _domainEvents.Add(domainEvent);
    }

    public void RemoveDomainEvent(BaseEvent domainEvent)
    {
        _domainEvents.Remove(domainEvent);
    }

    public void ClearDomainEvents()
    {
        _domainEvents.Clear();
    }
}
