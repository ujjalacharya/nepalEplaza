import React from "react";
import { Link } from "react-router-dom";
import {isAuthenticated} from "../../../Utils/Requests/Auth"

const UserLinks = () => {
  const {
    user: { _id }
} = isAuthenticated();

  return (
    <div className="card">
      <h4 className="card-header">User Links</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link className="nav-link" to="/cart">
            My Cart
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to={`/profile/${_id}`}>
            Update Profile
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default UserLinks;
