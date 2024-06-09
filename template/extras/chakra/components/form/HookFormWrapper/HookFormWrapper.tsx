/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DefaultValues, ValidationMode } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import type { Ref, ReactElement } from 'react';
import { forwardRef, useImperativeHandle } from 'react';

import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type GenericOnSubmit = (data: Record<string, any>, event?: React.BaseSyntheticEvent) => void;

type HookFormWrapperProps<DataSchema extends Record<string, any>, Schema extends z.Schema<any, any>> = {
  schema: Schema;
  onSubmit: (data: DataSchema, event?: React.BaseSyntheticEvent) => void;
  children: React.ReactNode;
  defaultValues?: DefaultValues<DataSchema>;
  mode?: keyof ValidationMode;
  reValidateMode?: 'onChange' | 'onBlur' | 'onSubmit';
};

const HookFormWrapper = forwardRef(
  <DataSchema extends Record<string, any>, Schema extends z.Schema<any, any>>(
    {
      schema,
      onSubmit,
      children,
      mode = 'all',
      defaultValues,
      reValidateMode = 'onChange',
    }: HookFormWrapperProps<DataSchema, Schema>,
    ref?: Ref<unknown> | undefined,
  ) => {
    const methods = useForm({
      defaultValues,
      mode,
      resolver: zodResolver(schema),
      reValidateMode,
    });

    useImperativeHandle(ref, () => methods, [methods]);

    return (
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit as GenericOnSubmit)}>{children}</form>
      </FormProvider>
    );
  },
) as <DataSchema extends Record<string, any>, Schema extends z.Schema<any, any>>(
  props: HookFormWrapperProps<DataSchema, Schema> & { ref?: Ref<any> },
) => ReactElement;

export default HookFormWrapper;
