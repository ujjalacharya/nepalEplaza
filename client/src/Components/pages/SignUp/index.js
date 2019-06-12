import React, { useState, useEffect } from "react";
import Layout from "../../core/Layout";
import Form from "./Form";
import { signUp } from "../../../Utils/Requests/Auth";

const Signup = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const { name, email, password } = state;

  const handleChange = e => {
    setState({ ...state, error: false, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = await signUp({ name, email, password }).catch(err => {
      console.log(err.response.data);
      setState({ ...state, error: err.response.data.error });
    });
    if (data)
      setState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: true
      });
  };

  return (
    <Layout
      title="Signup"
      description="Signup to nepalEPlaza"
      className="container col-md-8 offset-md-2"
    >
      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        state={state}
      />
    </Layout>
  );
};

export default Signup;
