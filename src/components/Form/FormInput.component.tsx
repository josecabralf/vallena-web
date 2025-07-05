import React, { type JSX } from 'react';
import { Controller, type Path } from 'react-hook-form';
import {
  type FieldValues,
  type FieldError,
  useFormContext,
} from 'react-hook-form';
import { CheckValue } from '../../shared';

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  rules?: {
    required?: string | boolean;
    maxLength?: number | { value: number; message: string };
    minLength?: number | { value: number; message: string };
    min?: number | { value: number; message: string };
    max?: number | { value: number; message: string };
    pattern?: RegExp | { value: RegExp; message: string };
    validate?: (
      value: unknown,
      formValues: T
    ) => boolean | string | Promise<boolean | string>;
  };
  children: JSX.Element;
  onSave?: (name: Path<T>, value: unknown) => void;
  onChange?: (e: unknown) => void;
}

const getErrorMessage = (error: FieldError | undefined): string | undefined => {
  if (!error) return undefined;
  if (
    typeof error.message === 'string' &&
    !CheckValue.isEmptyString(error.message)
  )
    return error.message;
  return 'Invalid input';
};

export const FormInput = <T extends FieldValues>({
  name,
  rules,
  children,
  onSave,
  onChange,
}: InputProps<T>) => {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext<T>();
  const [isLoading, setIsLoading] = React.useState(false);
  const errorMessage = getErrorMessage(errors[name] as FieldError | undefined);

  const handleSave = async (name: Path<T>, value: unknown) => {
    const isValid = await trigger(name);
    if (isValid && onSave) {
      setIsLoading(true);
      await onSave(name, value);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) =>
          React.cloneElement(children, {
            ...field,
            onChange: (e: unknown) => {
              onChange?.(e);
              if (typeof field.onChange === 'function') {
                field.onChange(e);
              }
              handleSave(
                name,
                (e as { target?: { value?: unknown } })?.target?.value ?? e
              );
            },
            isLoading: isLoading,
          })
        }
      />
      {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
    </div>
  );
};
