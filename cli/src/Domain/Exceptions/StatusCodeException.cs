namespace Taplist.Domain.Exceptions;

public abstract class StatusCodeException : Exception
{
    public int Code { get; private set; }

    protected StatusCodeException(int code, string? message = null)
        : base(message)
    {
        Code = code;
    }
}
