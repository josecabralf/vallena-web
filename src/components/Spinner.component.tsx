import React, { type CSSProperties } from "react";
import { Spin } from "antd";

export interface Props {
  animation?: "border" | "grow";
  size?: "sm" | "md";
  style?: CSSProperties;
}
export const Spinner: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <Spin
      style={{
        //     color: colors.primary,
        backgroundColor: "transparent",
        ...props.style,
      }}
    />
  );
};
