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

// Routes
app.use("/api", require("./routes/user"));

// Error handling middleware
app.use(function(err, req, res, next) {
 console.log(err);
 res.status(500).json({message: err.errmsg});
});

// Server initialization
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
