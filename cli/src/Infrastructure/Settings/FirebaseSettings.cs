using System.Text;
using Microsoft.AspNetCore.Authentication;

namespace Taplist.Infrastructure.Settings;

public class FirebaseSettings : AuthenticationSchemeOptions
{
    public string ApiKey { get; set; } = "";

    public string JwtAuthority { get; set; } = "";

    public string BaseApiAddress { get; set; } = "https://identitytoolkit.googleapis.com";

    public string Credential { get; set; } = "";

    public string CredentialDecoded => Encoding.UTF8.GetString(Convert.FromBase64String(Credential));
}
