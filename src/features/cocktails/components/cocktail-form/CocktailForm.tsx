import React, { useMemo } from 'react';

import { doc, setDoc } from 'firebase/firestore';
import { FieldArray, Form, Formik } from 'formik';
import { v4 as uuid } from 'uuid';
import { array, number, object, string } from 'yup';

import { firestore } from '../../../../firebase';
import LoadingBox from '../../../../shared/components/LoadingBox';
import Button from '../../../../shared/components/buttons/Button';
import Checkbox from '../../../../shared/components/form-controls/Checkbox';
import TextField from '../../../../shared/components/form-controls/TextField';
import SubsectionHeader from '../../../../shared/components/typography/SubsectionHeader';
import SubsectionHeaderWithButton from '../../../../shared/components/typography/SubsectionHeaderWithButton';
import { useIngredients } from '../../hooks/useIngredients';
import { Cocktail, CocktailIngredient, Unit } from '../../models/cocktail';
import { Ingredient } from '../../models/ingredient';
import IngredientField from './IngredientField';
import InstructionField from './InstructionField';

interface Props {
  cocktail?: Cocktail;
  onSubmit: (cocktail: Cocktail) => void;
}

export type CocktailFormValues = Omit<Cocktail, 'id'>;

const CocktailForm: React.FC<Props> = (props: Props) => {
  const [ingredients] = useIngredients();

  const initialValues: CocktailFormValues = useMemo(() => {
    const cocktail = props.cocktail ?? {
      name: '',
      description: '',
      curated: false,
      ingredients: [],
      instructions: [],
      relatedRecipes: [],
    };

    cocktail.ingredients = cocktail.ingredients.map((x) => ({
      ...x,
      ingredient: ingredients.find((y) => y.id === x.ingredientId),
    }));

    return cocktail;
  }, [ingredients, props.cocktail]);

  const schema = object({
    name: string().required(),
    description: string().required(),
    ingredients: array()
      .min(1)
      .of(
        object({
          instruction: string().nullable(),
          quantity: number().min(0),
          unit: string().oneOf(Object.keys(Unit)).required(),
        }),
      ),
    instructions: array().min(1).of(string().required()),
  });

  const buildNewIngredient = (): CocktailIngredient => ({
    ingredientId: '',
    unit: Unit.Ounce,
    quantity: 1,
    ingredient: {
      id: '',
      name: '',
    },
  });

  const onSubmit = async (formValue: CocktailFormValues) => {
    const cocktail: Cocktail = {
      id: '',
      name: formValue.name,
      description: formValue.description,
      instructions: formValue.instructions,
      ingredients: [],
      curated: formValue.curated ?? false,
      relatedRecipes: formValue.relatedRecipes,
    };

    for (const formIngredient of formValue.ingredients) {
      let ingredient: Ingredient | undefined = ingredients.find((x) => x.name === formIngredient.ingredient?.name);

      if (!ingredient?.id) {
        ingredient = {
          id: uuid(),
          name: formIngredient.ingredient?.name ?? '',
        };

        await setDoc(doc(firestore, 'ingredients', ingredient.id), ingredient);
        ingredients.push(ingredient);
      }

      cocktail.ingredients.push({
        ingredientId: ingredient.id,
        quantity: formIngredient.quantity,
        unit: formIngredient.unit,
      });
    }

    props.onSubmit(cocktail);
  };

  return ingredients.length ? (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={schema} enableReinitialize>
      {({ isSubmitting, values }) => (
        <Form
          className='flex flex-col gap-8'
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <section>
            <SubsectionHeaderWithButton header='Metadata'>
              <Checkbox name='curated' label='Curated' />
            </SubsectionHeaderWithButton>
            <TextField name='name' label='Name' />
            <TextField name='description' label='Description' as='textarea' />
          </section>
          <section>
            <SubsectionHeader>Ingredients</SubsectionHeader>
            <FieldArray name={'ingredients'}>
              {({ remove, push }) => (
                <>
                  <ul>
                    {values.ingredients.map((_, i) => (
                      <li key={i}>
                        <IngredientField
                          ingredients={ingredients}
                          baseName={`ingredients[${i}]`}
                          onRemove={() => remove(i)}
                        />
                      </li>
                    ))}
                  </ul>
                  <Button click={() => push(buildNewIngredient())}>Add Ingredient</Button>
                </>
              )}
            </FieldArray>
          </section>
          <section>
            <SubsectionHeader>Steps</SubsectionHeader>
            <FieldArray name={'instructions'}>
              {({ remove, push }) => (
                <>
                  <ol>
                    {values.instructions.map((_, i) => (
                      <li key={i}>
                        <InstructionField name={`instructions[${i}]`} onRemove={() => remove(i)} />
                      </li>
                    ))}
                  </ol>
                  <Button click={() => push('')}>Add Step</Button>
                </>
              )}
            </FieldArray>
          </section>
          <Button disabled={isSubmitting} loading={isSubmitting} type='submit'>
            Save
          </Button>
        </Form>
      )}
    </Formik>
  ) : (
    <LoadingBox />
  );
};

export default CocktailForm;
