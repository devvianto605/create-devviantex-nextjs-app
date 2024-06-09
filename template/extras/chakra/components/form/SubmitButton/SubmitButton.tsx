'use client';

import { Button } from '@chakra-ui/react';
import type { ButtonProps } from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

type SubmitButtonProps = ButtonProps & {
  label: React.ReactNode;
};

const SubmitButton = ({ label, ...other }: SubmitButtonProps): JSX.Element => {
  const { formState } = useFormContext();

  return (
    <Button
      isDisabled={formState.isSubmitting}
      isLoading={formState.isSubmitting}
      type='submit'
      variant='solid'
      {...other}
    >
      {label}
    </Button>
  );
};

export default SubmitButton;
