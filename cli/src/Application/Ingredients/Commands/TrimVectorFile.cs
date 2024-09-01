using FluentValidation;
using MediatR;
using Taplist.Application.Common.Interfaces.Repositories;
using Taplist.Application.Common.Interfaces.Services;

namespace Taplist.Application.Ingredients.Commands;

public record TrimVectorFile : IRequest
{
}

public class TrimVectorFileHandler : IRequestHandler<TrimVectorFile>
{
    private readonly IIngredientRepository _ingredientRepository;
    private readonly IVectorService _vectorService;
    
    public TrimVectorFileHandler(IIngredientRepository ingredientRepository, IVectorService vectorService)
    {
        _ingredientRepository = ingredientRepository;
        _vectorService = vectorService;
    }

    public async Task Handle(TrimVectorFile request, CancellationToken cancel)
    {
        var ingredients = await _ingredientRepository.GetAllIngredientsAsync(cancel);

        var words = ingredients.Select(x => x.VectorLookup).Distinct().ToArray();
        await _vectorService.FilterAndSaveVectors(words, cancel);
    }
}

public class TrimVectorFileValidator : AbstractValidator<TrimVectorFile>
{
    public TrimVectorFileValidator()
    {
    }
}

