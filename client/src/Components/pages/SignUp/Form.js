import React from "react";

const Form = ({ handleChange, handleSubmit, state }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange}
          name="name"
          type="text"
          className="form-control"
          value={state.name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange}
          name="email"
          type="email"
          className="form-control"
          value={state.email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control"
          value={state.password}
        />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default Form;
