/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from '@chakra-ui/react';
import type { CheckboxProps } from '@chakra-ui/react';
import FormControl from '../FormControl/FormControl';
import { useFormContext } from 'react-hook-form';

type CustomCheckBoxProps<Model> = React.InputHTMLAttributes<HTMLInputElement> & {
  name: keyof Model;
  formLabel?: string;
};

const CustomCheckBox = <Model extends Record<string, any>>({
  name,
  formLabel = '',
  ...other
}: CustomCheckBoxProps<Model>): JSX.Element => {
  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext();

  return (
    <FormControl errors={errors?.map()} formLabel={formLabel}>
      <Checkbox isDisabled={isSubmitting} {...register(name)} {...other} />
    </FormControl>
  );
};

export default CustomCheckBox;
