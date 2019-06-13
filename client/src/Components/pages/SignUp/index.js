import React, { useState } from "react";
import { Link } from "react-router-dom";
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

  const { name, email, password, error, success } = state;

  const handleChange = event => {
    setState({ ...state, error: false, [event.target.name]: event.target.value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setState({ ...state, error: false });
    const data = await signUp({ name, email, password }).catch(err => {
      setState({ ...state, error: err.response.data.error });
    });
    if (data && data.status === 200)
      setState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: true
      });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New account is created. Please <Link to="/signin">Signin</Link>
    </div>
  );

  return (
    <Layout
      title="Signup"
      description="Signup to nepalEPlaza"
      className="container col-md-8 offset-md-2"
    >
      {showSuccess()}
      {showError()}
      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        state={state}
      />
    </Layout>
  );
};

export default Signup;
