import React, { type ReactNode } from 'react';
import { Typography } from 'antd';
import { type CSSProperties } from 'react';

const { Title, Paragraph, Text } = Typography;

interface ParagraphProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'paragraph' | 'text';
  text: ReactNode;
  fontSize?: number | string;
  color?: string;
  style?: CSSProperties;
  className?: string;
  fontWeight?: number | 'lighter' | 'normal' | 'bold' | 'bolder';
  editable?: boolean;
  copyable?: boolean;
  disabled?: boolean;
  ellipsis?: boolean;
  code?: boolean;
  mark?: boolean;
  underline?: boolean;
  delete?: boolean;
  strong?: boolean;
  keyboard?: boolean;
  italic?: boolean;
}

const getTypographyComponent = (variant?: string) => {
  switch (variant) {
    case 'h1':
      return Title;
    case 'h2':
      return Title;
    case 'h3':
      return Title;
    case 'h4':
      return Title;
    case 'h5':
      return Title;
    case 'h6':
      return Title;
    case 'paragraph':
      return Paragraph;
    case 'text':
    default:
      return Text;
  }
};

export const CustomParagraph: React.FunctionComponent<ParagraphProps> = ({
  variant,
  text,
  fontSize,
  color,
  style,
  className,
  fontWeight,
  ...props
}) => {
  const customStyle: CSSProperties = {
    fontSize,
    fontWeight,
    color,
    whiteSpace: 'pre-line',
    ...style,
  };

  const TypographyComponent = getTypographyComponent(variant);

  return (
    <TypographyComponent style={customStyle} className={className} {...props}>
      {text}
    </TypographyComponent>
  );
};
