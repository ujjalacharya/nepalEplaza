import React, {useEffect} from "react";
import {isAuthenticated} from "../../../Utils/Requests/Auth"

const UserDashboard = () => {

 useEffect(() => {
  console.log(isAuthenticated())
 }, [])

  return <div>User Dashbaord</div>;
};

export default UserDashboard;
