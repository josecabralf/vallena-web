import React, {
  type CSSProperties,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { Select, Spin } from 'antd';
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

export interface ScrollableSelectI {
  // Función para cargar datos paginados
  fetchPagedOptions?: (
    page: number,
    pageSize: number
  ) => Promise<{
    data: SelectOptionI[];
    hasMore: boolean;
  }>;
  onAction?: (value: string, option: SelectOptionI | undefined) => void;
  placeholder?: string;
  deleteFilter: (filterType: string) => void;
  type: string;
  styles?: CSSProperties;
  disabled?: boolean;
  defaultValue?: string;
  size?: SizeType;
  onChange?: (value: string) => void;
  allowClear?: boolean;
  pageSize?: number;
}

export const ScrollableSelect: React.FunctionComponent<ScrollableSelectI> = (
  props: ScrollableSelectI
) => {
  const { fetchPagedOptions, pageSize = 10 } = props;
  const [value, setValue] = useState<string | undefined>(props.defaultValue);
  const [options, setOptions] = useState<SelectOptionI[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadOptions = useCallback(
    async (currentPage: number) => {
      if (!fetchPagedOptions || loading || !hasMore) return;

      setLoading(true);
      try {
        const result = await fetchPagedOptions(currentPage, pageSize);
        if (currentPage === 1) {
          // Si es la primera página, reemplazamos las opciones
          setOptions(result.data);
        } else {
          // Si no, añadimos a las existentes
          setOptions(prev => [...prev, ...result.data]);
        }
        setHasMore(result.hasMore);
      } catch {
        console.log();
      } finally {
        setLoading(false);
      }
    },
    [fetchPagedOptions, loading, hasMore, pageSize]
  );

  // Carga inicial
  useEffect(() => {
    setPage(1);
    setOptions([]);
    setHasMore(true);
    loadOptions(1);
  }, [loadOptions]);

  const handlePopupScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    // Si estamos cerca del final del scroll, cargamos más opciones
    if (
      !loading &&
      hasMore &&
      target.scrollTop + target.offsetHeight >= target.scrollHeight - 50
    ) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadOptions(nextPage);
    }
  };

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

  const dropdownRender = (menu: React.ReactElement) => (
    <>
      {menu}
      {loading && (
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <Spin size="small" />
        </div>
      )}
    </>
  );

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
      onPopupScroll={handlePopupScroll}
      dropdownRender={dropdownRender}
      listHeight={250}
    />
  );
};
