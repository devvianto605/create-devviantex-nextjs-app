/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Input as InputComponent } from '@chakra-ui/react';
import type { InputProps } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import FormControl from '../FormControl/FormControl';

type CustomInputProps<Model> = InputProps & {
  isRequired?: boolean;
  name: keyof Model | string;
  formLabel?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomInput = <Model extends Record<string, any>>({
  isRequired = false,
  name,
  formLabel = '',
  ...other
}: CustomInputProps<Model>): JSX.Element => {
  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext();

  let displayError;

  if (name.includes('.')) {
    if (errors[name.split('.')[0]]) {
      // @ts-expect-error
      displayError = errors[name.split('.')[0]][name.split('.')[1]];
    }
  } else {
    displayError = errors[name];
  }

  return (
    <FormControl errors={displayError?.message as string} formLabel={formLabel} isRequired={isRequired}>
      <InputComponent isDisabled={isSubmitting} {...register(name)} {...other} />
    </FormControl>
  );
};

export default CustomInput;
