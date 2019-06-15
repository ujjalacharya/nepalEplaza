import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/pages/Home";
import SignIn from "./Components/pages/SignIn";
import SignUp from "./Components/pages/SignUp";
import PrivateRoute from "./Utils/PrivateRoute";
import AdminRoute from "./Utils/AdminRoute";
import UserDashboard from "./Components/pages/Dashboard/UserDashboard";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import CreateCategory from "./Components/Admin/CreateCategory";
import CreateProduct from "./Components/Admin/CreateProduct";
import Shop from "./Components/pages/Shop";

const MainRouter = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/shop" exact component={Shop} />
    <Route path="/signin" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />
    <PrivateRoute path="/dashboard" exact component={UserDashboard} />
    <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
    <AdminRoute path="/create/category" exact component={CreateCategory}/>
    <AdminRoute path="/create/product" exact component={CreateProduct}/>
  </Switch>
);

export default MainRouter;
