import React, { useEffect, useState } from "react";
import Layout from "../../core/Layout";
import {
  getProductBySlug,
  getRelatedProducts
} from "../../../Utils/Requests/Shared";
import Card from "../../core/Card";

const Product = props => {
  const [values, setValues] = useState({
    product: "",
    error: "",
  });

  const [loading, setLoading] = useState(true);

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [randomNumber, setRandomNumber] = useState(0);

  const { product } = values;

  const loadRelatedProducts = async slug => {
    const relatedProducts = await getRelatedProducts(slug).catch(err => {
      setValues({ ...values, error: err.response.data.error });
    });
    if (relatedProducts && relatedProducts.status === 200) {
      const randomNumber = Math.floor(Math.random() * Math.floor(relatedProducts.data.length));
      setRelatedProducts(relatedProducts.data);
      setRandomNumber(randomNumber)
    }
  };

  const loadProduct = async () => {
    const slug = props.match.params.slug;
    const product = await getProductBySlug(slug).catch(err => {
      setValues({ ...values, error: err.response.data.error });
      setLoading(false);
    });

    if (product && product.status === 200) {
      setValues({
        ...values,
        error: false,
        product: product.data
      });
      setLoading(false);
      loadRelatedProducts(slug);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  useEffect(() => {
    loadProduct();
  }, [props.match.params.slug]);

  return (
    <Layout
      title={loading ? "Loading..." : product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="row">
        {product && product.description && (
          <Card className="col-md-7" product={product} viewProduct={false} />
        )}
        {relatedProducts.length > 0 && (
          <>
            <div className="col-md-1" />
            <div className="col-md-3">
              <h4 className="text-center">Similar products</h4>
              <Card
                className=""
                product={relatedProducts[randomNumber]}
                viewProduct={true}
              />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Product;
