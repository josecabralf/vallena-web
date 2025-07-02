import { type CSSProperties } from "react";
import { Button as AntdButton, type ButtonProps } from "antd";
import { type SizeType } from "antd/lib/config-provider/SizeContext";
import { Spinner } from ".";
import React from "react";

export interface ButtonI extends Omit<ButtonProps, "size"> {
  title?: string;
  onClick: (params?: any) => void;
  type?: "default" | "primary" | "dashed" | "link" | "text";
  style?: CSSProperties;
  icon?: React.ReactNode;
  onMouseOver?: (params?: any) => any;
  onMouseLeave?: (params?: any) => any;
  danger?: boolean;
  disabled?: boolean;
  size?: SizeType;
  loading?: boolean | { delay: number };
  ghost?: boolean;
  shape?: "default" | "circle" | "round";
  block?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonI> = ({
  title,
  onClick,
  type = "default",
  style,
  icon,
  onMouseOver,
  onMouseLeave,
  danger = false,
  disabled = false,
  size,
  loading,
  ghost,
  shape,
  block,
  isLoading,
  ...restProps
}) => {
  const customStyle: CSSProperties = {
    color: disabled ? "#B0B0B0" : "white", // Color de texto cuando está deshabilitado
    borderColor: disabled ? "#D9D9D9" : undefined, // Color del borde cuando está deshabilitado
    borderRadius: "10px",
    ...style,
  };

  return (
    <AntdButton
      style={customStyle}
      size={size}
      type={type}
      icon={icon}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      danger={danger}
      disabled={disabled}
      loading={loading}
      ghost={ghost}
      shape={shape}
      block={block}
      {...restProps}
    >
      {isLoading ? <Spinner size="sm" /> : title}
    </AntdButton>
  );
};
