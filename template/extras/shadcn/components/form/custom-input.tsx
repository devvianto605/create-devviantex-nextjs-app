import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input, type InputProps } from "@/components/ui/input";
import React from "react";
import { useFormContext } from "react-hook-form";
type CustomInputProps = { name: string; placeholder: string } & InputProps;

export const CustomInput = ({ name, placeholder, ...rest }: CustomInputProps): JSX.Element => {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Custom Input</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...rest} {...field} disabled={isSubmitting} />
          </FormControl>
          <FormDescription>This is custom input prototype.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};