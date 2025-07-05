import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';
import { CustomForm } from '../../components/Form/Form.component';
import { FormInput } from '../../components/Form/FormInput.component';
import { Input } from 'antd';

// Mock the form components needed
vi.mock('react-hook-form', async () => {
  const actual = await vi.importActual('react-hook-form');
  return {
    ...actual,
    useForm: () => ({
      handleSubmit: vi.fn(
        (fn: (data: unknown) => void) =>
          (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            fn({ testField: 'test value' });
          }
      ),
      reset: vi.fn(),
      control: {},
      formState: { errors: {} },
      trigger: vi.fn(),
    }),
    useFormContext: () => ({
      control: {},
      formState: { errors: {} },
      trigger: vi.fn(),
      getValues: () => ({ testField: 'test value' }),
      setValue: vi.fn(),
    }),
    FormProvider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    Controller: ({
      render,
      name,
    }: {
      render: (args: unknown) => React.ReactNode;
      name: string;
    }) =>
      render({
        field: {
          onChange: vi.fn(),
          onBlur: vi.fn(),
          value: '',
          name,
          ref: vi.fn(),
        },
        fieldState: { error: undefined },
        formState: { errors: {} },
      }),
  };
});

describe('CustomForm Component', () => {
  const defaultFormData = { testField: 'initial value' };

  test('renders without crashing', () => {
    expect(() =>
      render(
        <CustomForm defaultValues={defaultFormData}>
          <div>Form Content</div>
        </CustomForm>
      )
    ).not.toThrow();
  });

  test('renders children content', () => {
    render(
      <CustomForm defaultValues={defaultFormData}>
        <div>Form Content</div>
      </CustomForm>
    );

    expect(screen.getByText('Form Content')).toBeInTheDocument();
  });

  test('renders default submit button', () => {
    render(
      <CustomForm defaultValues={defaultFormData}>
        <div>Form Content</div>
      </CustomForm>
    );

    expect(screen.getByText('Guardar')).toBeInTheDocument();
  });

  test('renders custom submit text', () => {
    render(
      <CustomForm defaultValues={defaultFormData} submitText="Custom Submit">
        <div>Form Content</div>
      </CustomForm>
    );

    expect(screen.getByText('Custom Submit')).toBeInTheDocument();
  });

  test('renders custom submit button', () => {
    const customSubmitButton = <button>Custom Button</button>;
    render(
      <CustomForm
        defaultValues={defaultFormData}
        submitButton={customSubmitButton}
      >
        <div>Form Content</div>
      </CustomForm>
    );

    expect(screen.getByText('Custom Button')).toBeInTheDocument();
    expect(screen.queryByText('Guardar')).not.toBeInTheDocument();
  });

  test('hides submit button when showSubmitButton is false', () => {
    render(
      <CustomForm defaultValues={defaultFormData} showSubmitButton={false}>
        <div>Form Content</div>
      </CustomForm>
    );

    expect(screen.queryByText('Guardar')).not.toBeInTheDocument();
  });

  test('calls onSubmitForm when form is submitted', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    render(
      <CustomForm defaultValues={defaultFormData} onSubmitForm={mockSubmit}>
        <div>Form Content</div>
      </CustomForm>
    );

    const submitButton = screen.getByText('Guardar');
    await user.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledWith({ testField: 'test value' });
  });

  test('handles empty defaultValues', () => {
    expect(() =>
      render(
        <CustomForm defaultValues={{}}>
          <div>Form Content</div>
        </CustomForm>
      )
    ).not.toThrow();
  });

  test('handles form submission without onSubmitForm', async () => {
    const user = userEvent.setup();
    render(
      <CustomForm defaultValues={defaultFormData}>
        <div>Form Content</div>
      </CustomForm>
    );

    const submitButton = screen.getByText('Guardar');
    await user.click(submitButton);

    // Should not throw error
    expect(submitButton).toBeInTheDocument();
  });
});

describe('FormInput Component', () => {
  const TestFormWrapper = ({ children }: { children: React.ReactNode }) => (
    <CustomForm defaultValues={{ testField: '' }}>{children}</CustomForm>
  );

  test('renders without crashing', () => {
    expect(() =>
      render(
        <TestFormWrapper>
          <FormInput name="testField">
            <Input placeholder="Test input" />
          </FormInput>
        </TestFormWrapper>
      )
    ).not.toThrow();
  });

  test('renders child input component', () => {
    render(
      <TestFormWrapper>
        <FormInput name="testField">
          <Input placeholder="Test input" />
        </FormInput>
      </TestFormWrapper>
    );

    expect(screen.getByPlaceholderText('Test input')).toBeInTheDocument();
  });

  test('handles input changes', async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    render(
      <TestFormWrapper>
        <FormInput name="testField" onChange={mockOnChange}>
          <Input placeholder="Test input" />
        </FormInput>
      </TestFormWrapper>
    );

    const input = screen.getByPlaceholderText('Test input');
    await user.type(input, 'test value');

    expect(mockOnChange).toHaveBeenCalled();
  });

  test('handles validation rules', () => {
    const rules = {
      required: 'This field is required',
      maxLength: { value: 10, message: 'Too long' },
    };

    expect(() =>
      render(
        <TestFormWrapper>
          <FormInput name="testField" rules={rules}>
            <Input placeholder="Test input" />
          </FormInput>
        </TestFormWrapper>
      )
    ).not.toThrow();
  });

  test('handles onSave callback', () => {
    const mockOnSave = vi.fn();
    render(
      <TestFormWrapper>
        <FormInput name="testField" onSave={mockOnSave}>
          <Input placeholder="Test input" />
        </FormInput>
      </TestFormWrapper>
    );

    expect(screen.getByPlaceholderText('Test input')).toBeInTheDocument();
  });

  test('handles various validation rule types', () => {
    const rules = {
      required: true,
      maxLength: 10,
      minLength: 2,
      min: 0,
      max: 100,
      pattern: /^[a-zA-Z]+$/,
      validate: (value: unknown) => value !== '',
    };

    expect(() =>
      render(
        <TestFormWrapper>
          <FormInput name="testField" rules={rules}>
            <Input placeholder="Test input" />
          </FormInput>
        </TestFormWrapper>
      )
    ).not.toThrow();
  });

  test('handles complex validation rules with messages', () => {
    const rules = {
      required: 'Field is required',
      maxLength: { value: 10, message: 'Maximum 10 characters' },
      minLength: { value: 2, message: 'Minimum 2 characters' },
      min: { value: 0, message: 'Must be positive' },
      max: { value: 100, message: 'Must be less than 100' },
      pattern: { value: /^[a-zA-Z]+$/, message: 'Only letters allowed' },
      validate: (value: unknown) =>
        typeof value === 'string' && value.length > 0
          ? true
          : 'Custom validation failed',
    };

    expect(() =>
      render(
        <TestFormWrapper>
          <FormInput name="testField" rules={rules}>
            <Input placeholder="Test input" />
          </FormInput>
        </TestFormWrapper>
      )
    ).not.toThrow();
  });

  test('handles async validation', () => {
    const rules = {
      validate: async (value: unknown) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return typeof value === 'string' && value.length > 0;
      },
    };

    expect(() =>
      render(
        <TestFormWrapper>
          <FormInput name="testField" rules={rules}>
            <Input placeholder="Test input" />
          </FormInput>
        </TestFormWrapper>
      )
    ).not.toThrow();
  });
});
