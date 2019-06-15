import React, { useState, useEffect } from "react";
import Layout from "../../core/Layout";

import { getProducts } from "../../../Utils/Requests/Shared";
import Card from "../../core/Card";

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
    <Layout
      title="Home Page"
      description="NepalEPlaza"
      className="container-fluid"
    >
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {productsByArrival.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>

      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productsBySell.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
