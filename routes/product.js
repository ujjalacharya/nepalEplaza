const express = require("express");
const router = express.Router();

const { create, read, productBySlug } = require("../controllers/product");
const { requireSignin, isAdmin } = require("../controllers/auth");

router.post("/create", requireSignin, isAdmin, create);
router.get("/:slug", read);

router.param("slug", productBySlug);

module.exports = router;
