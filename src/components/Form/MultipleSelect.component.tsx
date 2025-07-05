import React, { type CSSProperties, useEffect, useState } from 'react';
import { Select } from 'antd';
import { type SelectProps } from 'antd/lib/select';
import { CheckValue } from '../../shared';

export type SizeType = 'small' | 'middle' | 'large';

export interface SelectOptionI {
  label: string;
  value?: string;
  data?: unknown;
  action?: (e: unknown, ...params: unknown[]) => void;
  actionParams?: unknown[];
}

export interface SelectI {
  options?: SelectOptionI[];
  fetchOptions?: () => Promise<SelectOptionI[]>;
  onAction?: (values: string[], options: SelectOptionI[]) => void;
  placeholder?: string;
  deleteFilter: (filterType: string) => void;
  type: string;
  styles?: CSSProperties;
  disabled?: boolean;
  defaultValue?: string[];
  size?: SizeType;
  onChange?: (values: string[]) => void;
  allowClear?: boolean;
  mode?: 'multiple' | 'tags';
}

export const MultiSelect: React.FunctionComponent<SelectI> = (
  props: SelectI
) => {
  const [value, setValue] = useState<string[] | undefined>(props.defaultValue);
  const [options, setOptions] = useState<SelectOptionI[]>(props.options || []);

  const onChange: SelectProps<string[]>['onChange'] = (
    values: string[],
    options: unknown
  ) => {
    if (props.onChange) props.onChange(values);

    if (!values || values.length === 0) {
      props.deleteFilter(props.type);
      setValue(undefined);
      return;
    }

    const selectedOptions = (
      options as Array<{ label: string; value: string; data: unknown }>
    ).map(option => ({
      label: option.label,
      value: option.value,
      data: option.data,
    }));

    if (props.onAction) {
      props.onAction(values, selectedOptions);
    }
    setValue(values);
  };

  useEffect(() => {
    if (props.fetchOptions) {
      props
        .fetchOptions()
        .then((fetchedOptions: SelectOptionI[] = []) => {
          setOptions(fetchedOptions);
        })
        .catch(_error => {
          // Handle error silently
        });
    }
  }, [props]);

  useEffect(() => {
    // Update value when defaultValue prop changes
    if (props.defaultValue) {
      setValue(props.defaultValue);
    }
  }, [props.defaultValue]);

  return (
    <Select
      mode={props.mode || 'multiple'}
      value={value}
      allowClear={
        CheckValue.isUndefined(props.allowClear) ? true : props.allowClear
      }
      size={props.size || 'large'}
      style={{ width: 200, ...props.styles }}
      showSearch
      placeholder={props.placeholder}
      filterOption={(input, option) =>
        typeof option?.label === 'string' &&
        option.label.toLowerCase().includes(input.toLowerCase())
      }
      onChange={onChange}
      options={options}
      optionLabelProp="label"
      disabled={props.disabled}
    />
  );
};
