import React from "react";
import { Menu } from "antd";

interface Props {
  onNavigate: (key: string) => void;
}

export const Sidebar: React.FC<Props> = ({ onNavigate }) => {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      style={{ height: "100%", borderRight: 0 }}
      items={[
        { key: "dashboard", label: "Dashboard" },
        { key: "settings", label: "Settings" },
        { key: "logout", label: "Logout" },
      ]}
      onSelect={({ key }) => onNavigate(key)}
    />
  );
};
