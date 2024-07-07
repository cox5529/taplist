using FluentValidation;
using MediatR;
using Taplist.Application.Common.Interfaces.Repositories;
using Taplist.Application.Common.Interfaces.Services;
using Taplist.Application.Ingredients.Queries;
using Taplist.Domain.Entities;

namespace Taplist.Application.Recipes.Commands;

public record ComputeSimilarRecipes : IRequest
{
}

public class ComputeSimilarRecipesHandler : IRequestHandler<ComputeSimilarRecipes>
{
    private readonly IRecipeRepository _recipeRepository;
    private readonly IMediator _mediator;
    private readonly IVectorService _vectorService;

    public ComputeSimilarRecipesHandler(IRecipeRepository recipeRepository, IMediator mediator, IVectorService vectorService)
    {
        _recipeRepository = recipeRepository;
        _mediator = mediator;
        _vectorService = vectorService;
    }

    public async Task Handle(ComputeSimilarRecipes request, CancellationToken cancel)
    {
        var ingredientMapResponse = await _mediator.Send(new ComputeIngredientVectors(), cancel);
        var recipes = (await _recipeRepository.GetAllAsync(cancel)).ToList();

        foreach (var recipeA in recipes)
        {
            var aVector = ComputeRecipeVector(ingredientMapResponse.IngredientMap, recipeA);
                
            foreach (var recipeB in recipes)
            {
                if (recipeA.Id == recipeB.Id)
                {
                    continue;
                }
                
                var bVector = ComputeRecipeVector(ingredientMapResponse.IngredientMap, recipeB);
                var similarity = _vectorService.Similarity(aVector, bVector);

                recipeA.SimilarRecipesMap[recipeB.Id] = similarity;
                recipeB.SimilarRecipesMap[recipeA.Id] = similarity;
            }
        }

        foreach (var recipe in recipes)
        {
            recipe.UpdateSimilarRecipes();
            await _recipeRepository.SaveAsync(recipe, cancel);
        }
    }

    private float[] ComputeRecipeVector(Dictionary<string, float[]> ingredientMap, Recipe recipe)
    {
        var ingredientVectors = recipe.Ingredients.Select(x => ingredientMap[x.IngredientId]);
        return _vectorService.Combine(ingredientVectors);
    }
}

public class ComputeSimilarRecipesValidator : AbstractValidator<ComputeSimilarRecipes>
{
    public ComputeSimilarRecipesValidator()
    {
    }
}
