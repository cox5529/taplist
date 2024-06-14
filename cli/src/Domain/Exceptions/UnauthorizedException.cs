namespace Taplist.Domain.Exceptions;

public class UnauthorizedException : StatusCodeException
{
    /// <inheritdoc />
    public UnauthorizedException(string? message = null)
        : base(401, message)
    {
    }
}
