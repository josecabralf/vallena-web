import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import moment, { type Moment } from "moment";

const { RangePicker } = DatePicker;

interface CustomDatePickerProps {
  isRange?: boolean;
  value?: Moment | [Moment, Moment | null] | null;
  onChange?: (date: Moment | [Moment, Moment | null] | null) => void;
  format?: string;
  disabledDate?: (current: Dayjs) => boolean;
  disablePastDates?: boolean;
  style?: React.CSSProperties;
  placeholder?: string | [string, string];
  disabled?: boolean;
  size?: "small" | "middle" | "large";
  allowClear?: boolean;
  showTime?: boolean | { format: string };
  open?: boolean;
  onFocus?: () => void;
  popupStyle?: React.CSSProperties;
  renderExtraFooter?: () => React.ReactNode;
  inputReadOnly?: boolean;
  onBlur?: () => void;
  isEndOptional?: boolean;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  isRange = false,
  value,
  onChange,
  format = "YYYY-MM-DD",
  disabledDate,
  disablePastDates = false,
  style,
  placeholder,
  disabled,
  size,
  allowClear,
  showTime,
  open,
  onFocus,
  popupStyle,
  renderExtraFooter,
  inputReadOnly,
  onBlur,
  isEndOptional = true,
}) => {
  const [internalValue, setInternalValue] = useState<Moment | [Moment, Moment | null] | null>(
    value || null,
  );

  useEffect(() => {
    setInternalValue(value || null);
  }, [value]);

  const convertToDayjs = (
    val: Moment | [Moment, Moment | null] | null,
  ): Dayjs | [Dayjs, Dayjs | null] | null => {
    if (!val) return null;
    if (moment.isMoment(val)) return dayjs(val.toISOString());
    if (Array.isArray(val)) {
      return [
        val[0] ? dayjs(val[0].toISOString()) : null,
        val[1] ? dayjs(val[1]?.toISOString()) : null,
      ] as [Dayjs, Dayjs | null];
    }
    return null;
  };

  const convertToMoment = (
    val: Dayjs | [Dayjs, Dayjs | null] | null,
  ): Moment | [Moment, Moment | null] | null => {
    if (!val) return null;
    if (dayjs.isDayjs(val)) return moment(val.toISOString());
    if (Array.isArray(val)) {
      return [
        val[0] ? moment(val[0].toISOString()) : null,
        val[1] ? moment(val[1]?.toISOString()) : null,
      ] as [Moment, Moment | null];
    }
    return null;
  };

  const handleChange = (dates: Dayjs | [Dayjs, Dayjs | null] | null) => {
    const converted = convertToMoment(dates);
    setInternalValue(converted);
    if (onChange) {
      onChange(converted);
    }
  };

  const combinedDisabledDate = (current: Dayjs): boolean => {
    const isBeforeToday = disablePastDates ? current.isBefore(dayjs(), "day") : false;
    return isBeforeToday || (disabledDate ? disabledDate(current) : false);
  };

  return isRange ? (
    <RangePicker
      value={convertToDayjs(internalValue) as [Dayjs, Dayjs | null]}
      onChange={(dates) => handleChange(dates as [Dayjs, Dayjs | null])}
      format={format}
      disabledDate={combinedDisabledDate}
      style={style}
      placeholder={Array.isArray(placeholder) ? placeholder : ["Start date", "End date"]}
      disabled={disabled}
      size={size}
      allowClear={allowClear}
      showTime={showTime}
      open={open}
      onFocus={onFocus}
      popupStyle={popupStyle}
      renderExtraFooter={renderExtraFooter}
      inputReadOnly={inputReadOnly}
      onBlur={onBlur}
      allowEmpty={[false, isEndOptional]}
    />
  ) : (
    <DatePicker
      value={convertToDayjs(internalValue) as Dayjs}
      onChange={(date) => handleChange(date)}
      format={format}
      disabledDate={combinedDisabledDate}
      style={style}
      placeholder={typeof placeholder === "string" ? placeholder : "Select date"}
      disabled={disabled}
      size={size}
      allowClear={allowClear}
      showTime={showTime}
      open={open}
      onFocus={onFocus}
      popupStyle={popupStyle}
      renderExtraFooter={renderExtraFooter}
      inputReadOnly={inputReadOnly}
      onBlur={onBlur}
    />
  );
};
