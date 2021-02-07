import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Add from "./Admin-Student/Add";
import Login from "./components/Login";
import Update from "./Admin-Student/Update";
import Delete from "./Admin-Student/Block";
import AdminReset from "./Admin-Student/PasswordReset";
import Forgot from "./Student/Forgot";
import Private from "./Student/Profle";
import PrivateRoute from "./auth/main-auth/PrivateRoute";
import Attendance from "./Admin-Student/Attendance";
import AdminRoute from "./auth/main-auth/AdminRoute";
import Reset from "./Student/Reset";
import Lab from "./Student/Lab";
import Home from "./core/GoogleSearch/Home"
import Search from "./core/GoogleSearch/Search"

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" exact component={App} />
        <Route path="/" exact component={Login} />
        <PrivateRoute path="/private" exact component={Private} />
        <AdminRoute path="/lab-attendance" exact component={Attendance} />
        <AdminRoute path="/admin-reset" exact component={AdminReset} />
        <Route path="/forgot" exact component={Forgot} />
        <Route path="/auth/password/reset/:token" exact component={Reset} />
        {/* Student Modification */}
        <Route path="/add" exact component={Add} />
        <Route path="/delete" exact component={Delete} />
        <Route path="/update" exact component={Update} />
        <PrivateRoute path="/lab" exact component={Lab} />

        <Route path="/google-home" exact component={Home} />
        <Route path="/search" exact component={Search} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
