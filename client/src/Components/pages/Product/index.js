import React, { useEffect, useState } from "react";
import Layout from "../../core/Layout";
import { getProductBySlug } from "../../../Utils/Requests/Shared";

const Product = props => {
  const [values, setValues] = useState({
    product: "",
    error: "",
    loading: false
  });

  const {product} = values;

  const loadProduct = async () => {
   console.log(props.match.params);
   const slug = props.match.params.slug;
    const product = await getProductBySlug(slug).catch(err => {
      setValues({ ...values, error: err.response.data.error });
    });

    if (product && product.status === 200) {
      setValues({ ...values, error: false, product: product.data });
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <Layout
      title="Home Page"
      description="Node React E-commerce App"
      className="container-fluid"
    >
      <h2 className="mb-4">Single Product</h2>
      <div className="row">{JSON.stringify(product)}</div>
    </Layout>
  );
};

export default Product;
