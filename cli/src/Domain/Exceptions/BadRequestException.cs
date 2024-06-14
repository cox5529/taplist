namespace Taplist.Domain.Exceptions;

public class BadRequestException : StatusCodeException
{
    /// <inheritdoc />
    public BadRequestException(string? message = null)
        : base(400, message)
    {
    }
}
