using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
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
        var settings = configuration.GetSection("IngredientParser").Get<IngredientParserSettings>()!;
        services.AddHttpClient<IngredientParserService>(client => { client.BaseAddress = new Uri(settings.Url); });
        services.AddScoped<IIngredientParserService>(p => p.GetRequiredService<IngredientParserService>());
    }

    private static void AddFirebase(this IServiceCollection services, IConfiguration configuration)
    {
        var credential = configuration.GetSection("Firebase").Get<FirebaseSettings>()!;
        services.Configure<FirebaseSettings>(o => configuration.GetSection("Firebase").Bind(o));
        services.AddAuthorization();

        services.Configure<JwtSettings>(o => configuration.GetSection("Jwt").Bind(o));
        services.Configure<DefaultUserSettings>(o => configuration.GetSection("DefaultUserSettings").Bind(o));

        if (FirebaseApp.DefaultInstance == null)
        {
            FirebaseApp.Create(new AppOptions { Credential = GoogleCredential.FromJson(credential.CredentialDecoded) });
        }
    }
}
