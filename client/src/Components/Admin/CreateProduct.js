import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../../Utils/Requests/Auth";
import { createProduct, getAllCategories } from "../../Utils/Requests/Admin";

const CreateProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: ""
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData
  } = values;

  // load categories and set form data
  const init = async () => {
    const result = await getAllCategories().catch(err => {
      setValues({
        ...values,
        error: err.response.data.error
      });
    });

    if (result && result.status === 200) {
      setValues({
        ...values,
        categories: result.data,
        formData: new FormData()
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, createdProduct: "", error: "", [name]: value });
  };

  const clickSubmit = async event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    const result = await createProduct(formData).catch(err => {
      setValues({ ...values, error: err.response.data.error });
    });
    if (result && result.status === 200) {
      console.log(result);
      setValues({
        ...values,
        name: "",
        description: "",
        photo: "",
        price: "",
        quantity: "",
        loading: false,
        error: "",
        category: "",
        shipping: "",
        createdProduct: result.data.name
      });
    }
  };

  const showError = () =>
    error && <div className="alert alert-danger">{error}</div>;

  const showSuccess = () =>
    createdProduct && (
      <div className="alert alert-info">
        <h2>{`${createdProduct}`} is created!</h2>
      </div>
    );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          value={description}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          value={price}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Category</label>
        <select onChange={handleChange("category")} className="form-control">
          <option>Please select</option>
          {categories &&
            categories.map((category, i) => (
              <option key={i} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select onChange={handleChange("shipping")} className="form-control">
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          value={quantity}
        />
      </div>

      <button className="btn btn-outline-primary">Create Product</button>
    </form>
  );

  return (
    <Layout
      title="Add a new product"
      description={`G'day admin, ready to add a new product?`}
    >
      {showError()}
      {showLoading()}
      {showSuccess()}
      <div className="row">
        <div className="col-md-8 offset-md-2">{newPostForm()}</div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
