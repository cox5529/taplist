using Taplist.Domain.Enums;

namespace Taplist.Application.Common.Models;

public class IngredientDto
{
    public string Id { get; set; } = "";
    
    public int? Order { get; set; }
    
    public string Name { get; set; } = "";

    public string Quantity { get; set; } = "";

    public double? QuantityAsDouble => double.TryParse(Quantity, out var x) ? x : null;

    public string? Comment { get; set; }

    public string Unit { get; set; } = "";

    public Units UnitAsEnum => UnitsMap.TryGetValue(Unit.ToLowerInvariant(), out var x) ? x : Units.Unit;

    private static readonly Dictionary<string, Units> UnitsMap = new()
    {
        { "dash", Units.Dash },
        { "dashes", Units.Dash },
        { "barspoon", Units.Barspoon },
        { "barspoons", Units.Barspoon },
        { "ounces", Units.Ounce },
        { "ounce", Units.Ounce },
        { "oz", Units.Ounce },
        { "tablespoons", Units.Tablespoon },
        { "tablespoon", Units.Tablespoon },
        { "tbsp", Units.Tablespoon },
        { "tb", Units.Tablespoon },
        { "teaspoons", Units.Teaspoon },
        { "teaspoon", Units.Teaspoon },
        { "tsp", Units.Teaspoon },
    };
}
