import { FormItemRule } from 'element-plus';

export const requiredRule = (message: string, trigger = 'blur'): FormItemRule => ({
  required: true,
  message,
  trigger,
});
