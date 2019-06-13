import React from "react";
import { isAuthenticated } from "../../../Utils/Requests/Auth";
import Layout from "../../core/Layout";
import UserLinks from "../../core/Dashboard/UserLinks";
import PurchaseHistory from "../../core/Dashboard/PurchaseHistory";
import UserInfo from "../../core/Dashboard/UserInfo";

const Dashboard = () => {
  const {
    user
  } = isAuthenticated();


  return (
    <Layout
      title="Dashboard"
      description={`G'day ${user.name}!`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{<UserLinks />}</div>
        <div className="col-9">
          {<UserInfo user={user}/>}
          {<PurchaseHistory />}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
