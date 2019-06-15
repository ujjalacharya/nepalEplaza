import React, { useState, useEffect } from "react";
import { getAllCategories, list } from "../../Utils/Requests/Shared";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
    error: ""
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = async () => {
    const result = await getAllCategories().catch(err => {
      setData({
        ...data,
        error: err.response.data.error
      });
    });

    if (result && result.status === 200) {
      setData({ ...data, categories: result.data });
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = async () => {
    // console.log(search, category);
    if (search) {
      const result = await list({
        search: search || undefined,
        category: category
      }).catch(err => {
        setData({ ...data, error: err.response.data.error });
      });

      if (result && result.status === 200) {
        setData({ ...data, results: result.data, searched: true });
      }
    }
  };

  const searchSubmit = e => {
    e.preventDefault();
    searchData();
  };

  const handleChange = name => event => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="All">Pick Category</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search by name"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );

  return (
    <div className="row">
      <div className="container mb-3">
        {searchForm()}
        {JSON.stringify(results)}
      </div>
    </div>
  );
};

export default Search;
