using FluentValidation;
using MediatR;
using Taplist.Application.Common.Interfaces.Repositories;
using Taplist.Application.Common.Interfaces.Services;
using Taplist.Domain.Entities;

namespace Taplist.Application.Ingredients.Queries;

public record ComputeIngredientVectors : IRequest<ComputeIngredientVectorsResponse>
{
    public IEnumerable<Ingredient> Ingredients { get; set; } = new List<Ingredient>();
}

public record ComputeIngredientVectorsResponse
{
    public Dictionary<string, float[]> IngredientMap { get; set; } = new();
}

public class ComputeIngredientVectorsHandler : IRequestHandler<ComputeIngredientVectors, ComputeIngredientVectorsResponse>
{
    private readonly IVectorService _vectorService;

    public ComputeIngredientVectorsHandler(IVectorService vectorService)
    {
        _vectorService = vectorService;
    }

    public async Task<ComputeIngredientVectorsResponse> Handle(ComputeIngredientVectors request, CancellationToken cancel)
    {
        var ingredients = request.Ingredients;

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
