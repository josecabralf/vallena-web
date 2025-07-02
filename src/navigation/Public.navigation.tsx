import React from "react";
import { LoginScreen } from "../screens";
import { observer } from "mobx-react";
import { Route, Routes } from "react-router-dom";

export interface Props {}

const PublicNavigation: React.FunctionComponent<Props> = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/*" element={<LoginScreen />} />
    </Routes>
  );
};

export default observer(PublicNavigation);
