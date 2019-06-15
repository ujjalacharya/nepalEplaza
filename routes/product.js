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
  listCategories,
  listByFilter,
  listBySearch,
  photo
} = require("../controllers/product");
const { requireSignin, isAdmin } = require("../controllers/auth");

router.post("/", requireSignin, isAdmin, create);

router.get("/", list);

router.post("/filter", listByFilter);

router.get("/search", listBySearch);

router.get("/related/:slug", listRelated);

router.get("/categories", listCategories);

router.get("/photo/:slug", photo);

router
  .route("/:slug")
  .get(read)
  .put(requireSignin, isAdmin, update)
  .delete(requireSignin, isAdmin, remove);

router.param("slug", productBySlug);

module.exports = router;
