namespace Taplist.Domain.Exceptions;

public class NotFoundException : StatusCodeException
{
    /// <inheritdoc />
    public NotFoundException(string? message = null)
        : base(404, message)
    {
    }
}
