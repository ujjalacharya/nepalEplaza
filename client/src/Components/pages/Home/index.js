import React, { useState, useEffect } from "react";
import Layout from "../../core/Layout";

import { getProducts } from "../../../Utils/Requests/Home";

const Home = () => {
  const [error, setError] = useState(false);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [productsBySell, setProductsBySell] = useState([]);

  const getProductsByArrival = async () => {
    const result = await getProducts("createdAt").catch(err => {
      setError(err.response.data.error);
    });

    if (result && result.status === 200) {
      setProductsByArrival(result.data);
      setError(false);
    }
  };

  const getProductsBySell = async () => {
    const result = await getProducts("sold").catch(err => {
      setError(err.response.data.error);
    });

    if (result && result.status === 200) {
      setProductsBySell(result.data);
      setError(false);
    }
  };

  useEffect(() => {
    getProductsByArrival();
    getProductsBySell();
  }, []);

  return (
    <Layout title="Home page">
      {JSON.stringify(productsByArrival)}
      <hr />
      {JSON.stringify(productsBySell)}
    </Layout>
  );
};

export default Home;
