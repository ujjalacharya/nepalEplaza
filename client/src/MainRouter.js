import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/core/Home";
import SignIn from "./Components/user/SignIn";
import SignUp from "./Components/user/SignUp";

const MainRouter = () => (
 <Switch>
   <Route path="/" exact component={Home}/>
   <Route path="/signin" exact component={SignIn}/>
   <Route path="/signup" exact component={SignUp}/>
 </Switch>
);

export default MainRouter;
