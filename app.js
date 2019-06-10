const { errorHandler } = require("./helpers/dbErrorHandler");
const expressValidator = require("express-validator");
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
require("express-async-errors");
require("dotenv").config();
const app = express();

// Database Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("DB Connected"));

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(expressValidator());

// Routes
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/user"));
app.use("/api", require("./routes/category"));

// Error handling middleware
app.use(function(err, req, res, next) {
  console.log(err);
  return res.status(500).json({
    error: errorHandler(err) || "Something went wrong!"
  });
});

// Server initialization
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
