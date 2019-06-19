import React, { useState, useEffect } from "react";
import Layout from "../../core/Layout";
import Card from "../../core/Card";
import {
  getAllCategories,
  getFilteredProducts
} from "../../../Utils/Requests/Shared";
import Checkbox from "../../core/Checkbox";
import RadioBox from "../../core/RadioBox";
import { prices } from "../../core/fixedPrice";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(3);
  const [size, setSize] = useState(0);
  const [skip, setSkip] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  const init = async () => {
    const result = await getAllCategories().catch(err => {
      setError(err.response.data.error);
    });

    if (result) setCategories(result.data);

    loadFilteredResults(skip, limit, myFilters.filters);
  };

  const loadFilteredResults = async (skip, limit, newFilters) => {
    const filteredProducts = await getFilteredProducts(
      skip,
      limit,
      newFilters
    ).catch(err => {
      setError(err.response.data.error);
      setLoading(false);
    });

    if (filteredProducts) {
      setFilteredResults(filteredProducts.data.product);
      setLoading(false);
      setSize(filteredProducts.data.size);
      setSkip(0);
    }
  };

  const handlePrice = value => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const loadMore = async () => {
    let toSkip = skip + limit;
    const filteredProducts = await getFilteredProducts(
      toSkip,
      limit,
      myFilters.filters
    ).catch(err => setError(err.response.data.error));

    if (filteredProducts) {
      setFilteredResults([
        ...filteredResults,
        ...filteredProducts.data.product
      ]);
      setSize(filteredProducts.data.size);
      setSkip(toSkip);
    }
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load more
        </button>
      )
    );
  };

  useEffect(() => {
    init();
  }, [myFilters]);

  return (
    <Layout
      title={loading ? "Loading..." : "Shop Page"}
      description={loading ? "" : "Search and find books of your choice"}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-2">
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

        <div className="col-md-10">
          <h2 className="mb-4 text-center">Products</h2>
          <div className="row">
            {filteredResults.map((product, i) => (
              <Card key={i} product={product} />
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
