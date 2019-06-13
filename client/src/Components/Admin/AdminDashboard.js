import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../../Utils/Requests/Auth";
import UserLinks from "../core/Dashboard/UserLinks";
import AdminLinks from "../core/Dashboard/AdminLinks";
import PurchaseHistory from "../core/Dashboard/PurchaseHistory";
import UserInfo from "../core/Dashboard/UserInfo";

const AdminDashboard = () => {
  const { user } = isAuthenticated();

  return (
    <Layout
      title="Dashboard"
      description={`G'day ${user.name}!`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{<AdminLinks />}</div>
        <div className="col-9">{<UserInfo user={user}/>}</div>
      </div>
      <div className="row">
        <div className="col-3">{<UserLinks />}</div>
        <div className="col-9">{<PurchaseHistory />}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
