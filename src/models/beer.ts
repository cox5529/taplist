import { date, number, object, string } from 'yup';

import { FieldProps } from '../components/form-controls/GenericForm';
import { Scale } from './scale';

export type Beer = {
  id?: string;
  abv: number;
  srm: number;
  ibu: number;
  originalGravity: number;
  finalGravity: number;
  name: string;
  style: string;
  description: string;
  brewDate: string | Date;
  packageDate: string | Date;
  capColor?: string;
  keg?: number;
  calories?: number;
  scale?: string;
  type: 'fermenting' | 'packaged';
};

export const beerValidators = object({
  name: string().required(),
  abv: number().min(1).max(15).required(),
  srm: number().min(1).max(50).required(),
  ibu: number().min(1).required(),
  originalGravity: number().min(0).max(2).required(),
  finalGravity: number().min(0).max(2).required(),
  description: string().required(),
  brewDate: date().required(),
  packageDate: date().required(),
  capColor: string().matches(/#[0-9A-Fa-f]{6}/g, 'Must be a hex color'),
  keg: number().min(0),
  calories: number().min(0),
  scale: string(),
  style: string().required()
});

export const beerFields = (scales: Scale[]): FieldProps<Beer>[] => [
  {
    name: 'name',
    label: 'Name',
    type: 'textfield',
  },
  {
    name: 'style',
    label: 'Style',
    type: 'textfield',
  },
  {
    name: 'abv',
    label: 'ABV',
    type: 'textfield',
    fieldType: 'number',
  },
  {
    name: 'srm',
    label: 'SRM',
    type: 'textfield',
    fieldType: 'number',
  },
  {
    name: 'ibu',
    label: 'IBU',
    type: 'textfield',
    fieldType: 'number',
  },
  {
    name: 'originalGravity',
    label: 'Original Gravity',
    type: 'textfield',
  },
  {
    name: 'finalGravity',
    label: 'Final Gravity',
    type: 'textfield',
  },
  {
    name: 'brewDate',
    label: 'Brew Date',
    type: 'textfield',
    fieldType: 'date',
  },
  {
    name: 'packageDate',
    label: 'Package Date',
    type: 'textfield',
    fieldType: 'date',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textfield',
    as: 'textarea',
    className: 'sm:col-span-2 lg:col-span-3',
  },
  {
    name: 'type',
    label: 'Status',
    type: 'dropdown',
    keys: [
      {
        value: 'fermenting',
        text: 'Fermenting',
      },
      {
        value: 'packaged',
        text: 'Packaged',
      },
    ],
  },
  {
    name: 'capColor',
    label: 'Cap Color',
    type: 'textfield',
  },
  {
    name: 'keg',
    label: 'Keg Number',
    type: 'textfield',
    fieldType: 'number',
  },
  {
    name: 'calories',
    label: 'Calories',
    type: 'textfield',
    fieldType: 'number',
  },
  {
    name: 'scale',
    label: 'Scale',
    type: 'dropdown',
    keys: [
      { text: 'None', value: '' },
      ...scales.map((x) => ({ text: `${x.ip} at ${x.percentFull.toFixed(2)}% capacity`, value: x.ip })),
    ],
  },
];
