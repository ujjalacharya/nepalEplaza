import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/pages/Home";
import SignIn from "./Components/pages/SignIn";
import SignUp from "./Components/pages/SignUp";

const MainRouter = () => (
 <Switch>
   <Route path="/" exact component={Home}/>
   <Route path="/signin" exact component={SignIn}/>
   <Route path="/signup" exact component={SignUp}/>
 </Switch>
);

export default MainRouter;
