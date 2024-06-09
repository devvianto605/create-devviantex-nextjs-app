import type { FormControlProps, FormErrorMessageProps, FormLabelProps } from '@chakra-ui/react';
import { FormControl as FormControlComponent, FormErrorMessage, FormLabel, Text } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

type FormControlWrapperProps = {
  isRequired?: boolean;
  errors?: string | undefined;
  children: React.ReactNode;
  formLabel: React.ReactNode;
  formControlProps?: FormControlProps;
  formLabelProps?: FormLabelProps;
  formErrorProps?: FormErrorMessageProps;
};

const FormControl = (props: FormControlWrapperProps) => {
  const { isRequired = false, errors, children, formLabel, formControlProps, formLabelProps, formErrorProps } = props;
  const t = useTranslations('form.errorMessage');

  return (
    <FormControlComponent isInvalid={Boolean(errors)} {...formControlProps}>
      {formLabel ? (
        <FormLabel fontSize='xs' textTransform='capitalize' {...formLabelProps}>
          <Text>
            {formLabel}
            {isRequired && (
              <Text as='b' color='red'>
                *
              </Text>
            )}
          </Text>
        </FormLabel>
      ) : null}
      {children}
      <FormErrorMessage fontSize='xs' {...formErrorProps}>
        {errors ? t(errors as never) : ''}
      </FormErrorMessage>
    </FormControlComponent>
  );
};

export default FormControl;
