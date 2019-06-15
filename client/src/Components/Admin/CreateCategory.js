import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { createCategory } from "../../Utils/Requests/Admin";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = async e => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const result = await createCategory({ name }).catch(err => {
      setError(err.response.data.error);
    });
    if (result && result.status === 200) {
      setError("");
      setSuccess(true);
      setName("");
    }
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  );

  const showSuccess = () =>
    success && <h3 className="text-success">New category is created</h3>;

  const showError = () =>
    error && <h3 className="text-danger">Category should be unique</h3>;

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      title="Add a new category"
      description={`G'day admin, ready to add a new category?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
