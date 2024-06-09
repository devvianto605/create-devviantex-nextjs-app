/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import { Avatar, Box, IconButton } from '@chakra-ui/react';
import FormControl from '../FormControl/FormControl';
import { Controller, useFormContext } from 'react-hook-form';
import { EditIcon } from '@chakra-ui/icons';

type CustomImageUploadProps<Model> = {
  avatarName: string;
  name: keyof Model;
  isRequired?: boolean;
  formLabel: string;
};

const CustomImageUpload = <Model extends Record<string, any>>({
  avatarName,
  name,
  isRequired,
  formLabel,
}: CustomImageUploadProps<Model>) => {
  const {
    control,
    formState: { isSubmitting, errors },
  } = useFormContext();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: any) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormControl errors={errors[name]?.message as string} formLabel={formLabel} isRequired={isRequired}>
      <Controller
        control={control}
        name={name as string}
        render={({ field: { onChange, onBlur, value } }) => (
          <Box position='relative' w='fit-content'>
            <Avatar name={avatarName} size='xl' src={value as string} />
            <IconButton
              aria-label='Edit image'
              bottom={-2}
              colorScheme='gray'
              disabled={isSubmitting}
              icon={<EditIcon />}
              position='absolute'
              right={-2}
              size='sm'
              onClick={() => fileInputRef.current?.click()}
            />
            <input
              ref={fileInputRef}
              hidden
              accept='image/*'
              type='file'
              onBlur={onBlur}
              onChange={(e) => handleImageChange(e, onChange)}
            />
          </Box>
        )}
      />
    </FormControl>
  );
};

export default CustomImageUpload;
