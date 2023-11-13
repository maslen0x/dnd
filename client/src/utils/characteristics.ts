import { characteristics } from '@/data/characteristics';
import { Characteristic } from '@/types/characteristics';
import { formatSign } from './format';

export const getModifier = (value: number, add = 0) => {
  const modifier = Math.floor((value - 10) / 2);
  return formatSign(modifier + add);
};

export const getLabel = (key: Characteristic, value: number) => {
  return `${characteristics[key]} (${getModifier(value)})`;
};
