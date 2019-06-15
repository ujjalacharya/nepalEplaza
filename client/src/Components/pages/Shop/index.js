import React, { useState, useEffect } from "react";
import Layout from "../../core/Layout";
import Card from "../../core/Card";
import { getAllCategories } from "../../../Utils/Requests/Shared";
import Checkbox from "../../core/Checkbox";
import RadioBox from "../../core/RadioBox";
import {prices} from "../../core/fixedPrice";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
  });

  const init = async () => {
    const result = await getAllCategories().catch(err => {
      setError(err.response.data.error);
    });

    if (result) setCategories(result.data);
  };

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    setMyFilters(newFilters);
  };

  useEffect(() => {
    init();
    console.log(myFilters);
  }, [myFilters]);

  return (
    <Layout
      title="Shop Page"
      description="Search and find books of your choice"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter by categories</h4>
          <ul>
            {
              <Checkbox
                categories={categories}
                handleFilters={filters => handleFilters(filters, "category")}
              />
            }
          </ul>

          <h4>Filter by price range</h4>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={filters => handleFilters(filters, "price")}
            />
          </div>
        </div>

        <div className="col-8">right</div>
      </div>
    </Layout>
  );
};

export default Shop;
