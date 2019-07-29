const router = require("express").Router();

const {
  create,
  read,
  categoryById,
  update,
  remove,
  list
} = require("../controllers/category");
const { requireSignin, isAdmin } = require("../controllers/auth");

router.post("/", requireSignin, isAdmin, create);

router.get("/", list);

router
  .route("/:categoryId")
  .get(read)
  .put(requireSignin, isAdmin, update)
  .delete(requireSignin, isAdmin, remove);

router.param("categoryId", categoryById);

module.exports = router;
