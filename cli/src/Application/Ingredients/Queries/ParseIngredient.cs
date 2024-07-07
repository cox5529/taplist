using FluentValidation;
using MediatR;
using Taplist.Application.Common.Interfaces.Services;
using Taplist.Application.Common.Models;
using Taplist.Application.Ingredients.Commands;
using Taplist.Domain.Exceptions;

namespace Taplist.Application.Ingredients.Queries;

public class ParseIngredientRequest : IRequest<ParseIngredientResponse>
{
    public string Input { get; set; } = "";
}

public class ParseIngredientResponse
{
    public IngredientDto? Result { get; set; }
}

public class ParseIngredientQuery : IRequestHandler<ParseIngredientRequest, ParseIngredientResponse>
{
    private readonly IMediator _mediator;
    private readonly IIngredientParserService _ingredientParserService;

    public ParseIngredientQuery(IIngredientParserService ingredientParserService, IMediator mediator)
    {
        _ingredientParserService = ingredientParserService;
        _mediator = mediator;
    }

    /// <inheritdoc />
    public async Task<ParseIngredientResponse> Handle(ParseIngredientRequest request, CancellationToken cancel)
    {
        var result = await _ingredientParserService.ParseIngredientAsync(request.Input, cancel);
        if (result == null)
        {
            throw new BadRequestException();
        }

        if (result.Name.StartsWith("Garnish: "))
        {
            result.Name = result.Name[9..];
        }

        result.Name = char.ToUpper(result.Name[0]) + result.Name[1..];

        var ingredient = await _mediator.Send(new CreateIngredient { Ingredient = result }, cancel);
        result.Id = ingredient.Id;
        return new ParseIngredientResponse { Result = result };
    }
}

public class ParseIngredientRequestValidator : AbstractValidator<ParseIngredientRequest>
{
    public ParseIngredientRequestValidator()
    {
        RuleFor(x => x.Input).NotEmpty();
    }
}
