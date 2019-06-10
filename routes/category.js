const router = require("express").Router();

const {
  create,
  read,
  categoryById,
  update,
  remove
} = require("../controllers/category");
const { requireSignin, isAdmin } = require("../controllers/auth");

router.post("/create", requireSignin, isAdmin, create);

router
  .route("/:categoryId")
  .get(read)
  .put(requireSignin, isAdmin, update)
  .delete(requireSignin, isAdmin, remove);

router.param("categoryId", categoryById);

module.exports = router;
