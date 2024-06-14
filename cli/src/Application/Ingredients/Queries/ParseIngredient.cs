using FastEndpoints;
using FluentValidation;
using Taplist.Application.Common.Interfaces.Repositories;
using Taplist.Application.Common.Interfaces.Services;
using Taplist.Application.Common.Models;
using Taplist.Application.Ingredients.Commands;
using Taplist.Domain.Exceptions;

namespace Taplist.Application.Ingredients.Queries;

public class ParseIngredientRequest
{
    public string Input { get; set; } = "";
}

public class ParseIngredientResponse
{
    public IngredientDto? Result { get; set; }
}

public class ParseIngredientQuery : Endpoint<ParseIngredientRequest, ParseIngredientResponse>
{
    private readonly IIngredientParserService _ingredientParserService;

    public ParseIngredientQuery(IIngredientParserService ingredientParserService)
    {
        _ingredientParserService = ingredientParserService;
    }

    public override void Configure()
    {
        Get("/ingredients/parse");
    }

    public override async Task HandleAsync(ParseIngredientRequest request, CancellationToken cancel)
    {
        var result = await _ingredientParserService.ParseIngredientAsync(request.Input, cancel);
        if (result == null)
        {
            throw new BadRequestException();
        }

        var ingredient = await new CreateIngredient { Ingredient = result }.ExecuteAsync(cancel);
        result.Id = ingredient.Id;
        Response = new ParseIngredientResponse { Result = result };
    }
}

public class ParseIngredientRequestValidator : Validator<ParseIngredientRequest>
{
    public ParseIngredientRequestValidator()
    {
        RuleFor(x => x.Input).NotEmpty();
    }
}
