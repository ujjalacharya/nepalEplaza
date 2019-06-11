import React from "react";
import Menu from "./Menu";

const Layout = ({ title, children, className }) => (
  <div>
    <Menu />
    <div className="jumbotron">
      <h2>{title}</h2>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
