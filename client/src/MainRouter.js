import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/pages/Home";
import SignIn from "./Components/pages/SignIn";
import SignUp from "./Components/pages/SignUp";
import PrivateRoute from "./Utils/PrivateRoute";
import UserDashboard from "./Components/pages/Dashboard/UserDashboard";

const MainRouter = () => (
 <Switch>
   <Route path="/" exact component={Home}/>
   <Route path="/signin" exact component={SignIn}/>
   <Route path="/signup" exact component={SignUp}/>
   <PrivateRoute path="/secret" exact component={UserDashboard} />
 </Switch>
);

export default MainRouter;
