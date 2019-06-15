import React, { useState, useEffect } from "react";

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setCheked] = useState([]);

  const handleChange = id => () => {
    const currentCategoryId = checked.indexOf(id);
    const newCheckedCategoryId = [...checked];
    // if currently checked was not already in checked state > push
    // else pull/take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(id);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    setCheked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId)
  };

  return categories.map((category, i) => (
    <li key={i} className="list-unstyled">
      <input
        type="checkbox"
        className="form-check-input"
        onChange={handleChange(category._id)}
      />
      <label className="form-check-label">{category.name}</label>
    </li>
  ));
};

export default Checkbox;
