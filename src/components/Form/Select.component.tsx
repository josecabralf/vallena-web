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
  onAction?: (value: string, option: SelectOptionI | undefined) => void;
  placeholder?: string;
  deleteFilter: (filterType: string) => void;
  type: string;
  styles?: CSSProperties;
  disabled?: boolean;
  defaultValue?: string;
  size?: SizeType;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  allowClear?: boolean;
}

export const CustomSelect: React.FunctionComponent<SelectI> = (
  props: SelectI
) => {
  const [value, setValue] = useState<string | undefined>(props.defaultValue);
  const [options, setOptions] = useState<SelectOptionI[]>(props.options || []);

  const onChange: SelectProps<string>['onChange'] = (
    value: string,
    _option: unknown
  ) => {
    if (props.onChange) props.onChange(value);
    if (!value) {
      props.deleteFilter(props.type);
      setValue(undefined);
      return;
    }
    const selectedOption = options.find(opt => opt.value === value);
    if (props.onAction) {
      props.onAction(value, selectedOption);
    }
    setValue(value);
  };

  const onSearch: SelectProps<string>['onSearch'] = (value: string) => {
    if (props.onSearch) props.onSearch(value);
    return;
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

  return (
    <Select
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
      onSearch={onSearch}
    />
  );
};
