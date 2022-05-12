import React from "react";
import { Route, Switch } from "react-router";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import PrivateRoutes from "./PrivateRoutes";
import Product from "../pages/Product/index";
import List from "../pages/Product/List";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <PrivateRoutes
        path="/dashboard"
        component={Dashboard}
        role="ROLE_ADMIN"
      />
      <PrivateRoutes
        path="/product"
        exact
        component={Product}
        role="ROLE_ADMIN,ROLE_USER"
      />
      <PrivateRoutes
        path="/product/list"
        component={List}
        role="ROLE_ADMIN,ROLE_USER"
      />
    </Switch>
  );
};

export default Routes;
