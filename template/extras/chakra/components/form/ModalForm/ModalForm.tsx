/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DefaultValues, ValidationMode } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';

import type { ModalProps } from '@chakra-ui/react';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type GenericOnSubmit = (data: Record<string, any>, event?: React.BaseSyntheticEvent) => void;

type ModalFormProps<DataSchema extends Record<string, any>, Schema extends z.Schema<any, any>> = ModalProps & {
  schema: Schema;
  isOpen: boolean;
  onClose: () => void;
  mode?: keyof ValidationMode;
  children: React.ReactNode;
  defaultValues?: DefaultValues<DataSchema>;
  onSubmit: (data: DataSchema, event?: React.BaseSyntheticEvent) => void;
};

const ModalForm = <DataSchema extends Record<string, any>, Schema extends z.Schema<any, any>>({
  schema,
  isOpen,
  onClose,
  children,
  mode = 'all',
  onSubmit,
  defaultValues,
  ...other
}: ModalFormProps<DataSchema, Schema>): JSX.Element => {
  const methods = useForm({
    defaultValues,
    mode,
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
  });
  const { handleSubmit } = methods;

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} {...other}>
      <ModalOverlay />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit as GenericOnSubmit)}>
          <ModalContent borderRadius='16px'>{children}</ModalContent>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default ModalForm;
