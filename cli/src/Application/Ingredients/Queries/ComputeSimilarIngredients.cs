using FluentValidation;
using MediatR;
using Taplist.Application.Common.Interfaces.Repositories;
using Taplist.Application.Common.Interfaces.Services;
using Taplist.Domain.Entities;

namespace Taplist.Application.Ingredients.Queries;

public record ComputeSimilarIngredients : IRequest<ComputeSimilarIngredientsResponse>
{
}

public record ComputeSimilarIngredientsResponse
{
    public Dictionary<string, Ingredient> Ingredients { get; set; } = new();
}

public class ComputeSimilarIngredientsHandler : IRequestHandler<ComputeSimilarIngredients, ComputeSimilarIngredientsResponse>
{
    private readonly IIngredientRepository _ingredientRepository;
    private readonly IVectorService _vectorService;
    
    public ComputeSimilarIngredientsHandler(IIngredientRepository ingredientRepository, IVectorService vectorService)
    {
        _ingredientRepository = ingredientRepository;
        _vectorService = vectorService;
    }

    public async Task<ComputeSimilarIngredientsResponse> Handle(ComputeSimilarIngredients request, CancellationToken cancel)
    {
        var ingredients = await _ingredientRepository.GetAllIngredientsAsync(cancel);
        var ingredientArray = ingredients.ToArray();
        var response = new ComputeSimilarIngredientsResponse();

        for (var i = 0; i < ingredientArray.Length; i++)
        {
            var a = ingredientArray[i];
            a.Similarities[a.Id] = 1;
            var aVector = await _vectorService.GetVectorAsync(a.VectorLookup, cancel);
            
            for (var j = i + 1; j < ingredientArray.Length; j++)
            {
                var b = ingredientArray[j];
                var bVector = await _vectorService.GetVectorAsync(b.VectorLookup, cancel);
                var similarity = _vectorService.Similarity(aVector, bVector);

                a.Similarities[b.Id] = similarity;
                b.Similarities[a.Id] = similarity;
            }

            response.Ingredients[a.Id] = a;
        }

        return response;
    }
}

public class ComputeSimilarIngredientsValidator : AbstractValidator<ComputeSimilarIngredients>
{
    public ComputeSimilarIngredientsValidator()
    {
    }
}

