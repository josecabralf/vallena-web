import React from "react";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";

interface BreadcrumbConfig {
  [key: string]: {
    title: string;
    parent?: string;
  };
}

const BREADCRUMB_CONFIG: BreadcrumbConfig = {
  dashboard: {
    title: "Tablero",
  },
  "cash-register": {
    title: "Caja",
  },
  config: {
    title: "CONFIGURACIÓN",
  },
  users: {
    title: "Usuarios",
    parent: "config",
  },
  currencies: {
    title: "Divisas",
    parent: "config",
  },
  "configuration-type": {
    title: "Configuraciones",
    parent: "config",
  },
};

interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const location = useLocation();

  const getBreadcrumbItems = () => {
    const pathSegments = location.pathname.slice(1).split("/");
    const items: { title: string }[] = [];

    let currentPath = "";
    for (const segment of pathSegments) {
      currentPath += (currentPath ? "/" : "") + segment;

      const config = BREADCRUMB_CONFIG[currentPath];
      if (config) {
        if (config.parent && BREADCRUMB_CONFIG[config.parent]) {
          const parentConfig = BREADCRUMB_CONFIG[config.parent];
          if (!items.find((item) => item.title === parentConfig.title)) {
            items.push({ title: parentConfig.title });
          }
        }

        items.push({ title: config.title });
      }
    }

    return items;
  };

  return (
    <div style={{ background: "white", padding: "20px", borderRadius: "8px", margin: "16px 8px" }}>
      <Breadcrumb items={getBreadcrumbItems()} />
      {children}
    </div>
  );
};
