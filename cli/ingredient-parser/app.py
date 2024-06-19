import sys
import json
from ingredient_parser import parse_ingredient
import nltk

nltk.download('averaged_perceptron_tagger', quiet=True)

if len(sys.argv) != 2:
    print('Incorrect number of arguments: 2 expected')
    sys.exit(1)

result = parse_ingredient(sys.argv[1])
output = {
    'sentence': result.sentence,
    'quantity': result.quantity,
    'unit': result.unit,
    'name': result.name,
    'comment': result.comment,
    'other': result.other
}
print(json.dumps(output))
