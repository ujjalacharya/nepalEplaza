const express = require("express");
const router = express.Router();

const { create } = require("../controllers/product");
const { requireSignin, isAdmin } = require("../controllers/auth");

router.post("/create", requireSignin, isAdmin, create);

module.exports = router;
