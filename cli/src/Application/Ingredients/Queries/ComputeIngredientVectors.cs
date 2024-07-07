using FluentValidation;
using MediatR;
using Taplist.Application.Common.Interfaces.Repositories;
using Taplist.Application.Common.Interfaces.Services;

namespace Taplist.Application.Ingredients.Queries;

public record ComputeIngredientVectors : IRequest<ComputeIngredientVectorsResponse>
{
}

public record ComputeIngredientVectorsResponse
{
    public Dictionary<string, float[]> IngredientMap { get; set; } = new();
}

public class ComputeIngredientVectorsHandler : IRequestHandler<ComputeIngredientVectors, ComputeIngredientVectorsResponse>
{
    private readonly IIngredientRepository _ingredientRepository;
    private readonly IVectorService _vectorService;

    public ComputeIngredientVectorsHandler(IIngredientRepository ingredientRepository, IVectorService vectorService)
    {
        _ingredientRepository = ingredientRepository;
        _vectorService = vectorService;
    }

    public async Task<ComputeIngredientVectorsResponse> Handle(ComputeIngredientVectors request, CancellationToken cancel)
    {
        var ingredients = await _ingredientRepository.GetAllIngredientsAsync(cancel);

        var output = new ComputeIngredientVectorsResponse();
        foreach (var ingredient in ingredients)
        {
            var vector = await _vectorService.GetVectorAsync(ingredient.VectorLookup, cancel);
            output.IngredientMap[ingredient.Id] = vector;
        }

        return output;
    }
}

public class ComputeIngredientVectorsValidator : AbstractValidator<ComputeIngredientVectors>
{
    public ComputeIngredientVectorsValidator()
    {
    }
}
