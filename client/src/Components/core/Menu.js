import React, {useState, useEffect} from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../../Utils/Requests/Auth";

import {cartLength} from "../../Utils/cartUtil";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => {

  const [cartSize, setCartSize] = useState(0);

  useEffect(() => {
    setCartSize(cartLength());
  }, [])

  return(
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/shop")}
            to="/shop"
          >
            Shop
          </Link>
        </li>

        {!isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signin")}
                to="/signin"
              >
                Signin
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signup")}
                to="/signup"
              >
                Signup
              </Link>
            </li>
          </>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/dashboard")}
              to="/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/admin/dashboard")}
              to="/admin/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated() && (
          <>
            <li className="nav-item">
              <span
                className="nav-link"
                style={{ cursor: "pointer", color: "#ffffff" }}
                onClick={async () => {
                  const result = await signout().catch(err => console.log(err));
                  if (result) {
                    history.push("/");
                  }
                }}
              >
                Signout
              </span>
            </li>
            <li className="mr-2 m-auto" style={{ color: "#000" }}>
              <span>Cart Item: {cartSize}</span>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
