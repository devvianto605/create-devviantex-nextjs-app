'use client';

import { Button } from '@chakra-ui/react';
import type { ButtonProps } from '@chakra-ui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

type ResetButtonProps = ButtonProps & {
  label: React.ReactNode;
};

const ResetButton = ({ label, ...other }: ResetButtonProps): JSX.Element => {
  const {
    formState: { isSubmitting, isDirty },
    reset,
  } = useFormContext();

  const handleResetForm = () => reset();

  return (
    <Button
      isDisabled={isSubmitting || !isDirty}
      isLoading={isSubmitting}
      variant='solid'
      {...other}
      type='button'
      onClick={handleResetForm}
    >
      {label}
    </Button>
  );
};

export default ResetButton;
