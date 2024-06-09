import { Controller, useFormContext } from 'react-hook-form';
import { Radio, RadioGroup } from '@chakra-ui/react';

import FormControl from '../FormControl/FormControl';
import type { RadioGroupProps } from '@chakra-ui/react';

type Option = { label: string; value: string };

type CustomRadioProps<Model> = Omit<RadioGroupProps, 'name'> & {
  name: keyof Model;
  formLabel: string;
  options: Option[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomRadio = <Model extends Record<string, any>>({
  name,
  formLabel,
  options,
  ...other
}: CustomRadioProps<Model>): JSX.Element => {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext(); // Specify the form context type <Model>

  return (
    <FormControl formLabel={formLabel}>
      <Controller
        control={control}
        name={name as string}
        render={({ field }) => (
          <RadioGroup {...field} {...other}>
            {options.map((option) => (
              <Radio key={option.value} isDisabled={isSubmitting} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};

export default CustomRadio;
