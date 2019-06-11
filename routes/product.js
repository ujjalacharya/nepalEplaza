const express = require("express");
const router = express.Router();

const {
  create,
  read,
  productBySlug,
  update,
  remove,
  list,
  listRelated,
  listCategories
} = require("../controllers/product");
const { requireSignin, isAdmin } = require("../controllers/auth");

router.post("/create", requireSignin, isAdmin, create);

router.get("/all", list);

router.get("/related/:slug", listRelated);

router.get("/categories", listCategories)

router
  .route("/:slug")
  .get(read)
  .put(requireSignin, isAdmin, update)
  .delete(requireSignin, isAdmin, remove);

router.param("slug", productBySlug);

module.exports = router;
