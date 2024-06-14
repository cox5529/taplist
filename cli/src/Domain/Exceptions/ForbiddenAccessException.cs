namespace Taplist.Domain.Exceptions;

public class ForbiddenAccessException : StatusCodeException
{
    /// <inheritdoc />
    public ForbiddenAccessException(string? message = null)
        : base(403, message)
    {
    }
}
