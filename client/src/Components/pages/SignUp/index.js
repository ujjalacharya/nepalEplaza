import React, { useState, useEffect } from "react";
import Layout from "../../core/Layout";
import Form from "./Form";

const Signup = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  // useEffect(() => {
  //   console.log(state);
  // }, [state]);

  const handleChange = e => {
    setState({ ...state, error: false, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <Layout
      title="Signup"
      description="Signup to nepalEPlaza"
      className="container col-md-8 offset-md-2"
    >
      <Form handleChange={handleChange} handleSubmit={handleSubmit} />
    </Layout>
  );
};

export default Signup;
