using FluentValidation;
using MediatR;
using Taplist.Application.Common.Interfaces.Repositories;
using Taplist.Application.Common.Interfaces.Services;

namespace Taplist.Application.Ingredients.Queries;

public record DetermineNecessaryAlternates : IRequest<DetermineNecessaryAlternatesResponse>
{
}

public record DetermineNecessaryAlternatesResponse
{
    public IEnumerable<string> Alternates = new List<string>();
}

public class DetermineNecessaryAlternatesHandler
    : IRequestHandler<DetermineNecessaryAlternates, DetermineNecessaryAlternatesResponse>
{
    private readonly IVectorService _vectorService;
    private readonly IIngredientRepository _ingredientRepository;

    public DetermineNecessaryAlternatesHandler(IVectorService vectorService, IIngredientRepository ingredientRepository)
    {
        _vectorService = vectorService;
        _ingredientRepository = ingredientRepository;
    }

    public async Task<DetermineNecessaryAlternatesResponse> Handle(DetermineNecessaryAlternates request, CancellationToken cancel)
    {
        var ingredients = await _ingredientRepository.GetAllIngredientsAsync(cancel);
        var names = ingredients.Select(x => x.VectorLookup);

        var output = new List<string>();
        foreach (var name in names)
        {
            try
            {
                await _vectorService.GetVectorAsync(name, cancel);
            }
            catch
            {
                output.Add(name);
            }
        }

        return new DetermineNecessaryAlternatesResponse { Alternates = output };
    }
}

public class DetermineNecessaryAlternatesValidator : AbstractValidator<DetermineNecessaryAlternates>
{
    public DetermineNecessaryAlternatesValidator()
    {
    }
}
