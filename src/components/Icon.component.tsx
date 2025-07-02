import React from "react";
import { ICON_REGISTRY } from "../config";

interface IconProps {
  name: keyof typeof ICON_REGISTRY;
  size?: number;
  color?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 20, color, className }) => {
  const IconComponent = ICON_REGISTRY[name];

  if (!IconComponent) {
    return <span style={{ color: "red" }}>⚠️ Icono no encontrado</span>;
  }

  return <IconComponent style={{ fontSize: size, color }} className={className} />;
};
