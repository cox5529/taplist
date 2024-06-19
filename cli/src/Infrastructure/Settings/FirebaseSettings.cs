using System.Text;

namespace Taplist.Infrastructure.Settings;

public class FirebaseSettings
{
    public string ProjectId { get; set; } = "";
    
    public string Credential { get; set; } = "";

    public string CredentialDecoded => Encoding.UTF8.GetString(Convert.FromBase64String(Credential));
}
