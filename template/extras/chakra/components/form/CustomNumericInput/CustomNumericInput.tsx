import { Input as InputComponent } from '@chakra-ui/react';
import type { InputProps } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/padding-line-between-statements */
import FormControl from '../FormControl/FormControl';

type CustomNumericInputProps<Model> = InputProps & {
  isRequired?: boolean;
  name: keyof Model | string;
  formLabel?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomNumericInput = <Model extends Record<string, any>>({
  isRequired = false,
  name,
  formLabel = '',
  ...other
}: CustomNumericInputProps<Model>): JSX.Element => {
  const {
    register,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useFormContext();

  const { onChange, onBlur, ref } = register(name);

  const value = watch(name);

  const handleNumericChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numberValue = parseInt(event.target.value, 10);
    setValue(name, numberValue, { shouldValidate: true });
  };

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
      <InputComponent
        isDisabled={isSubmitting}
        {...other}
        ref={ref}
        inputMode='numeric'
        type='text'
        value={value || ''}
        onBlur={onBlur}
        onChange={(e) => {
          handleNumericChange(e);
          onChange(e);
        }}
      />
    </FormControl>
  );
};

export default CustomNumericInput;
