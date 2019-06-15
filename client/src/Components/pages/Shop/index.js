import React, { useState, useEffect } from "react";
import Layout from "../../core/Layout";
import Card from "../../core/Card";
import { getAllCategories } from "../../../Utils/Requests/Shared";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  const init = async () => {
    const result = await getAllCategories().catch(err => {
      setError(err.response.data.error);
    });

    if (result) setCategories(result.data);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Layout
      title="Shop Page"
      description="Search and find books of your choice"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">{JSON.stringify(categories)}</div>

        <div className="col-8">right</div>
      </div>
    </Layout>
  );
};

export default Shop;
