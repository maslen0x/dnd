import { formatSign } from './format';

export const getModifier = (value: number, add = 0) => {
  const modifier = Math.floor((value - 10) / 2);
  return formatSign(modifier + add);
};
