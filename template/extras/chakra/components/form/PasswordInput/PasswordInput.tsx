/* eslint-disable @typescript-eslint/no-explicit-any */

import { Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import FormControl from '../FormControl/FormControl';
import type { InputProps } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useToggle } from 'react-use';

type PasswordInputProps<Model> = InputProps & {
  name: keyof Model;
  formLabel: string;
  isRequired?: boolean;
};

const PasswordInput = <Model extends Record<string, any>>({
  name,
  formLabel,
  isRequired,
  ...other
}: PasswordInputProps<Model>): JSX.Element => {
  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext();

  const [isShowPassword, toggleShowPassword] = useToggle(false);
  const icon = isShowPassword ? ViewIcon : ViewOffIcon;
  const inputType = isShowPassword ? 'text' : 'password';

  return (
    <FormControl errors={errors[name]?.message as string} formLabel={formLabel} isRequired={isRequired}>
      <InputGroup>
        <Input disabled={isSubmitting} {...register(name)} {...other} type={inputType} />
        <InputRightElement onClick={toggleShowPassword}>
          <Icon as={icon} boxSize='18px' color='gray.600' />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default PasswordInput;
