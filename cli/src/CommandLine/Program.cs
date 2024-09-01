using System.CommandLine;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Console;
using Taplist.Application;
using Taplist.Application.Common.Interfaces.Services;
using Taplist.Application.Ingredients.Commands;
using Taplist.Application.Ingredients.Queries;
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

    private static IVectorService GetVectorService()
    {
        var services = new ServiceCollection();
        ConfigureServices(services);

        var serviceProvider = services.BuildServiceProvider();
        var vectorService = serviceProvider.GetRequiredService<IVectorService>();

        return vectorService;
    }

    public static async Task Main(string[] args)
    {
        var mediator = GetMediator();
        var vectorService = GetVectorService();

        var rootCommand = new RootCommand("Imports a recipe from a given URL to the barlist") { Name = "barlist-import" };
        var urlArgument = new Argument<string>("URL", "URL to import the recipe from");
        rootCommand.AddArgument(urlArgument);
        rootCommand.SetHandler((url) => mediator.Send(new ImportRecipeRequest { Url = url }), urlArgument);

        var alternateCommand = new Command("sub", "Determine what ingredients need alternate word vector lookup keys");
        alternateCommand.SetHandler(
            async () =>
            {
                var response = await mediator.Send(new DetermineNecessaryAlternates());
                foreach (var word in response.Alternates)
                {
                    Console.WriteLine(word);
                }
            });

        var setAlternateCommand = new Command("set-alternate", "Sets the alternate for a given ingredient");
        var ingredientArgument = new Argument<string>("ingredient", "The ingredient to add the alternate for");
        var alternateArgument = new Argument<string>("alternate", "The alternate to use when computing similarity");
        setAlternateCommand.AddArgument(ingredientArgument);
        setAlternateCommand.AddArgument(alternateArgument);
        setAlternateCommand.SetHandler(
            (ingredient, alternate) => mediator.Send(
                new AddSimilarityAlternate
                {
                    Alternate = alternate,
                    Ingredient = ingredient
                }),
            ingredientArgument,
            alternateArgument);

        var similarityCommand = new Command("meta", "Computes and saves recipe metadata");
        similarityCommand.SetHandler(() => mediator.Send(new ComputeMetadata()));

        var trimCommand = new Command("trim", "Trims vector file to only contain used words");
        trimCommand.SetHandler(() => mediator.Send(new TrimVectorFile()));

        rootCommand.AddCommand(alternateCommand);
        rootCommand.AddCommand(setAlternateCommand);
        rootCommand.AddCommand(similarityCommand);
        rootCommand.AddCommand(trimCommand);
        await rootCommand.InvokeAsync(args);
    }
}
