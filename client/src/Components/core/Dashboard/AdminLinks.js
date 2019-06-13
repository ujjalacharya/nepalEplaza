import React from "react";
import { Link } from "react-router-dom";

const AdminLinks = () => {
  return (
    <div className="card">
      <h4 className="card-header">Admin Links</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link className="nav-link" to="/create/category">
            Create Category
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to="/create/product">
            Create Product
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminLinks;
