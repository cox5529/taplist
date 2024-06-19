using Google.Cloud.Firestore;
using Google.Cloud.Firestore.V1;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Taplist.Application.Common.Interfaces.Repositories;
using Taplist.Application.Common.Interfaces.Services;
using Taplist.Infrastructure.Repositories;
using Taplist.Infrastructure.Services;
using Taplist.Infrastructure.Settings;

namespace Taplist.Infrastructure;

public static class DependencyInjection
{
    public static void AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddFirebase(configuration);
        services.AddSingleton(TimeProvider.System);
        services.AddIngredientParser(configuration);
        services.AddRecipeImports();

        services.AddRepositories();
    }

    private static void AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IRecipeRepository, RecipeRepository>();
        services.AddScoped<IIngredientRepository, IngredientRepository>();
    }

    private static void AddRecipeImports(this IServiceCollection services)
    {
        services.AddScoped<IJsonLdService, JsonLdService>();
        services.AddHttpClient<RecipeImportService>();
        services.AddScoped<IRecipeImportService>(p => p.GetRequiredService<RecipeImportService>());
    }

    private static void AddIngredientParser(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<IngredientParserSettings>(o => configuration.GetSection("IngredientParser").Bind(o));
        services.AddScoped<IIngredientParserService, IngredientParserService>();
    }

    private static void AddFirebase(this IServiceCollection services, IConfiguration configuration)
    {
        var credential = configuration.GetSection("FirebaseSettings").Get<FirebaseSettings>()!;
        services.Configure<FirebaseSettings>(o => configuration.GetSection("FirebaseSettings").Bind(o));

        var client = new FirestoreClientBuilder() { JsonCredentials = credential.CredentialDecoded }.Build();
        services.AddScoped<FirestoreDb>((_) => FirestoreDb.Create(credential.ProjectId, client));
    }
}
