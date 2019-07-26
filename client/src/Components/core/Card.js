import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addToCart } from "../../Utils/cartUtil";

const Card = ({
  product,
  viewProduct = true,
  className = "col-md-4",
  addToCartButton = true
}) => {
  const [redirect, setRedirect] = useState(false);

  const showViewButton = () => {
    return (
      viewProduct && (
        <Link to={`/products/${product.slug}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2">
            View Product
          </button>
        </Link>
      )
    );
  };

  const handleAddCart = () => {
    addToCart(product, () => {
      setRedirect(true);
    });
  };

  const showAddToCartButton = () => {
    return (
      addToCartButton && (
        <button
          className="btn btn-outline-warning mt-2 mb-2"
          onClick={handleAddCart}
        >
          Add to cart
        </button>
      )
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock</span>
    );
  };

  return (
    <div className={`card ${className} mt-4`}>
      {redirect && <Redirect to="/cart" />}
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        <ShowImage item={product} url="products" />
        <p className="lead mt-2">{product.description.substring(0, 100)}</p>
        <p className="black-10">Rs {product.price}</p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>
        <p className="black-8">Added {moment(product.createdAt).fromNow()}</p>

        {showStock(product.quantity)}
        <br />

        {showViewButton()}

        {showAddToCartButton()}
      </div>
    </div>
  );
};

export default Card;
