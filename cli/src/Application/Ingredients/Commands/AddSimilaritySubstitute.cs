using FluentValidation;
using MediatR;
using Taplist.Application.Common.Interfaces.Repositories;
using Taplist.Application.Common.Interfaces.Services;
using Taplist.Domain.Exceptions;

namespace Taplist.Application.Ingredients.Commands;

public record AddSimilarityAlternate : IRequest
{
    public string Ingredient { get; set; } = "";

    public string Alternate { get; set; } = "";
}

public class AddSimilarityAlternateHandler : IRequestHandler<AddSimilarityAlternate>
{
    private readonly IIngredientRepository _ingredientRepository;
    
    public AddSimilarityAlternateHandler(IIngredientRepository ingredientRepository)
    {
        _ingredientRepository = ingredientRepository;
    }

    public async Task Handle(AddSimilarityAlternate request, CancellationToken cancel)
    {
        var ingredient = await _ingredientRepository.GetByNameAsync(request.Ingredient, cancel);
        if (ingredient == null)
        {
            throw new NotFoundException();
        }

        ingredient.AlternateName = request.Alternate.ToLower();
        await _ingredientRepository.SaveAsync(ingredient, cancel);
    }
}

public class AddSimilarityAlternateValidator : AbstractValidator<AddSimilarityAlternate>
{
    public AddSimilarityAlternateValidator()
    {
    }
}

