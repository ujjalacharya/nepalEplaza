import React from "react";
import { API } from "../../Utils/config";

const ShowImage = ({ item, url }) => (
  <div className="product-img">
    <img
      src={`${API}/${url}/photo/${item.slug}`}
      alt={item.name}
      className="mb-3"
      style={{ height: "300px", objectFit: "cover", width: "100%" }}
    />
  </div>
);

export default ShowImage;
