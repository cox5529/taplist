using JsonLD.Core;
using Newtonsoft.Json.Linq;
using Schema.NET;
using Taplist.Application.Common.Interfaces.Services;

namespace Taplist.Infrastructure.Services;

public class JsonLdService : IJsonLdService
{
    public Recipe? Frame(JToken jsonLd)
    {
        ReplaceContext(jsonLd);
        var frame = JsonLdProcessor.Frame(
            jsonLd,
            JToken.Parse("{\"@context\":\"https://schema.org/docs/jsonldcontext.jsonld\",\"@type\":[\"Recipe\"]}"),
            new JsonLdOptions());

        if (frame["@graph"] is not JArray { Count: 1 } graph)
        {
            return null;
        }

        if (graph[0] is not JObject recipe)
        {
            return null;
        }

        recipe.Property("type")?.Remove();
        ReplaceType(recipe);
        var json = recipe.ToString();
        return SchemaSerializer.DeserializeObject<Recipe>(json);
    }

    private static void ReplaceContext(JToken input)
    {
        if (input is JArray array)
        {
            foreach (var child in array.Children())
            {
                ReplaceContext(child);
            }
        }
        else if (input is JObject obj)
        {
            var context = obj.Property("@context");
            context?.Replace(new JProperty("@context", "https://schema.org/docs/jsonldcontext.jsonld"));

            foreach (var child in obj.Children())
            {
                ReplaceContext(child);
            }
        }
    }

    private static void ReplaceType(JToken input)
    {
        if (input is JArray array)
        {
            foreach (var child in array.Children())
            {
                ReplaceType(child);
            }
        }
        else if (input is JObject obj)
        {
            var context = obj.Property("type");
            context?.Replace(new JProperty("@type", context.Value));

            foreach (var child in obj.Properties())
            {
                ReplaceType(child.Value);
            }
        }
    }
}
