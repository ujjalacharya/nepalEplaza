import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div>
      <>
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="/signup">
          <p>Signup</p>
        </Link>
      </>
      <h2>SignIn</h2>
    </div>
  );
};

export default SignIn;
