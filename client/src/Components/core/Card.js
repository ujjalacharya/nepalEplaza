import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";

const Card = ({ product }) => {
  return (
    <div className="col-md-4 col-sm-12">
      <div className="card">
        <div className="card-header">{product.name}</div>
        <div className="card-body">
          <ShowImage url="products" item={product}/>
          <p>{product.description}</p>
          <p>Rs {product.price}</p>
          <Link to={`/products/${product.slug}`}>
            <button className="btn btn-outline-primary mt-2 mb-2">
              View Product
            </button>
          </Link>
          <button className="btn btn-outline-warning mt-2 mb-2">
            Add to card
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
