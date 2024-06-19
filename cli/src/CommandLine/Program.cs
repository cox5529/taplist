using System.CommandLine;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Console;
using Taplist.Application;
using Taplist.Application.Recipes.Commands;
using Taplist.Infrastructure;

namespace Taplist.CommandLine;

public static class Program
{
    private static IConfiguration LoadConfiguration()
    {
        var homeDirectory = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        var configDirectoryPath = $"{homeDirectory}/.taplist";
        if (!Directory.Exists(configDirectoryPath))
        {
            Directory.CreateDirectory(configDirectoryPath);
            File.Create($"{configDirectoryPath}/config.json");

            Console.WriteLine(
                $"Configuration file created at {configDirectoryPath
                }/config.json. Please update it with credentials before continuing.");
            Environment.Exit(1);
        }

        var configuration = new ConfigurationBuilder().AddJsonFile($"{configDirectoryPath}/config.json", false);
        return configuration.Build();
    }

    private static void ConfigureServices(ServiceCollection services)
    {
        var configuration = LoadConfiguration();
        services.AddInfrastructureServices(configuration);
        services.AddApplication();
        services.AddLogging(
            o => o.AddSimpleConsole(
                options =>
                {
                    options.SingleLine = true;
                    options.IncludeScopes = false;
                    options.ColorBehavior = LoggerColorBehavior.Enabled;
                }));
    }

    private static IMediator GetMediator()
    {
        var services = new ServiceCollection();
        ConfigureServices(services);

        var serviceProvider = services.BuildServiceProvider();
        var mediator = serviceProvider.GetRequiredService<IMediator>();

        return mediator;
    }

    public static async Task Main(string[] args)
    {
        var mediator = GetMediator();

        var rootCommand = new RootCommand("Imports a recipe from a given URL to the barlist") { Name = "barlist-import" };
        var urlArgument = new Argument<string>("URL", "URL to import the recipe from");
        rootCommand.AddArgument(urlArgument);
        rootCommand.SetHandler((url) => mediator.Send(new ImportRecipeRequest { Url = url }), urlArgument);

        await rootCommand.InvokeAsync(args);
    }
}