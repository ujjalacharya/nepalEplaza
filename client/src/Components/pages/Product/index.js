import React, { useEffect, useState } from "react";
import Layout from "../../core/Layout";
import { getProductBySlug } from "../../../Utils/Requests/Shared";
import Card from "../../core/Card";

const Product = props => {
  const [values, setValues] = useState({
    product: "",
    error: "",
    loading: false
  });

  const { product } = values;

  const loadProduct = async () => {
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
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="row">
        {product && product.description && (
          <Card product={product} viewProduct={false} />
        )}
      </div>
    </Layout>
  );
};

export default Product;
