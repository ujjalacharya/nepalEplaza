import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Components/pages/Home";
import SignIn from "../Components/pages/SignIn";
import SignUp from "../Components/pages/SignUp";
import PrivateRoute from "../Router/PrivateRoute";
import AdminRoute from "../Router/AdminRoute";
import UserDashboard from "../Components/pages/Dashboard/UserDashboard";
import AdminDashboard from "../Components/Admin/AdminDashboard";
import CreateCategory from "../Components/Admin/CreateCategory";
import CreateProduct from "../Components/Admin/CreateProduct";
import Cart from "../Components/pages/Cart";
import Shop from "../Components/pages/Shop";
import Product from "../Components/pages/Product";

const MainRouter = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/shop" exact component={Shop} />
    <Route path="/signin" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />
    <Route path="/products/:slug" exact component={Product} />
    <PrivateRoute path="/dashboard" exact component={UserDashboard} />
    <PrivateRoute path="/cart" exact component={Cart} />
    <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
    <AdminRoute path="/create/category" exact component={CreateCategory} />
    <AdminRoute path="/create/product" exact component={CreateProduct} />
  </Switch>
);

export default MainRouter;
