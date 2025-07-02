import React from "react";
import { Layout } from "antd";
import { Routes } from "react-router-dom";
// import tus rutas aquí, como <Route path="..." element={<... />} />

const CONTENT_STYLE = {
  padding: "5px 24px",
};

export const Content: React.FC = () => {
  return (
    <Layout style={CONTENT_STYLE}>
      <Routes>{/* <Route path="/" element={<DashboardScreen />} /> */}</Routes>
    </Layout>
  );
};
