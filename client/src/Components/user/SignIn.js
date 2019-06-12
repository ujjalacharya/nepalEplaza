import React, { useEffect } from "react";
import Layout from "../core/Layout";
import { API } from "../../Utils/config";

const SignIn = () => {
  
  useEffect(() => {
    console.log(API);
  }, []);

  return <Layout title="SignIn">...</Layout>;
};

export default SignIn;
