import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { observer } from "mobx-react";
import { PrivateNavigation, PublicNavigation } from "./";
import { useAuth } from "../hooks";

const AppNavigation: React.FC = () => {
  const { logged, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Router>{logged ? <PrivateNavigation /> : <PublicNavigation />}</Router>;
};

export default observer(AppNavigation);
