import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <>
        <Link to="/signin">
          <p>Signin</p>
        </Link>
        <Link to="/signup">
          <p>Signup</p>
        </Link>
      </>
      <h2>Home</h2>      
    </div>
  );
}

export default Home;