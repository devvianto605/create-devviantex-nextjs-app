import FormControl from '../FormControl/FormControl';
import { Textarea } from '@chakra-ui/react';
import type { TextareaProps } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

type CustomTextAreaProps<Model> = TextareaProps & {
  isRequired?: boolean;
  name: keyof Model;
  formLabel: string;
};

const CustomTextArea = <Model extends Record<string, unknown>>({
  isRequired = false,
  name,
  formLabel,
  ...other
}: CustomTextAreaProps<Model>): JSX.Element => {
  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext();

  return (
    <FormControl errors={errors[name]?.message as string} formLabel={formLabel} isRequired={isRequired}>
      <Textarea isDisabled={isSubmitting} {...register(name)} {...other} />
    </FormControl>
  );
};

export default CustomTextArea;
