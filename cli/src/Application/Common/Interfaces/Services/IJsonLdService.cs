using Newtonsoft.Json.Linq;
using Schema.NET;

namespace Taplist.Application.Common.Interfaces.Services;

public interface IJsonLdService
{
    Recipe? Frame(JToken jsonLd);
}
