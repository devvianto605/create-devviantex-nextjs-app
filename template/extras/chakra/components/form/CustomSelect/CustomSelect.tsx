/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useFormContext } from 'react-hook-form';

import FormControl from '../FormControl/FormControl';
import { Select } from '@chakra-ui/react';
import type { SelectProps } from '@chakra-ui/react';

type CustomSelectProps<Model> = SelectProps & {
  isRequired?: boolean;
  name: keyof Model;
  formLabel?: string;
};

const CustomSelect = <Model extends Record<string, any>>({
  isRequired = false,
  name,
  formLabel = '',
  children,
  ...other
}: CustomSelectProps<Model>): JSX.Element => {
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext();

  return (
    <FormControl errors={errors[name]?.message as string} formLabel={formLabel} isRequired={isRequired}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select isDisabled={isSubmitting} {...field} {...other}>
            {children}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default CustomSelect;
