/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useFormContext } from 'react-hook-form';

import FormControl from '../FormControl/FormControl';
import { Switch } from '@chakra-ui/react';
import type { SwitchProps } from '@chakra-ui/react';

type CustomSwitchProps<Model> = SwitchProps & {
  isRequired?: boolean;
  name: keyof Model;
  formLabel?: string;
};

const CustomSwitch = <Model extends Record<string, any>>({
  isRequired = false,
  name,
  formLabel = '',
  ...other
}: CustomSwitchProps<Model>): JSX.Element => {
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
          <Switch
            isChecked={field.value}
            isDisabled={isSubmitting}
            onChange={(e) => field.onChange(e.target.checked)}
            {...other}
          />
        )}
      />
    </FormControl>
  );
};

export default CustomSwitch;
