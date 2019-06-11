import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div>
      <>
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="/signin">
          <p>Signin</p>
        </Link>
      </>
      <h2>SignUp</h2>
    </div>
  );
}

export default SignUp;