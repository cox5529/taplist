namespace Taplist.Infrastructure.Models.Firebase;

public class LoginRequest
{
    public string? Email { get; set; }

    public string? Password { get; set; }

    public bool ReturnSecureToken { get; set; } = true;
}
