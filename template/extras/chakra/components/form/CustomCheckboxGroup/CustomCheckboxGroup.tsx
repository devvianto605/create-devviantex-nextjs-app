/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-handler-names */
import { Controller, useFormContext } from 'react-hook-form';

import { CheckboxGroup } from '@chakra-ui/react';
import type { CheckboxGroupProps } from '@chakra-ui/react';
import FormControl from '../FormControl/FormControl';
import React from 'react';

type CustomCheckboxGroupProps<Model> = Omit<CheckboxGroupProps, 'name'> & {
  isRequired?: boolean;
  name: keyof Model;
  formLabel: string;
  children: React.ReactNode;
};

const CustomCheckboxGroup = <Model extends Record<string, unknown>>({
  isRequired = false,
  name,
  formLabel,
  children,
  ...other
}: CustomCheckboxGroupProps<Model>) => {
  const {
    control,
    formState: { isSubmitting, errors },
  } = useFormContext();

  return (
    <FormControl errors={errors[name]?.message as string} formLabel={formLabel} isRequired={isRequired}>
      <Controller
        control={control}
        defaultValue={[]}
        name={name as string}
        render={({ field }) => (
          <CheckboxGroup isDisabled={isSubmitting} value={field.value} onChange={field.onChange} {...other}>
            {children}
          </CheckboxGroup>
        )}
      />
    </FormControl>
  );
};

export default CustomCheckboxGroup;
