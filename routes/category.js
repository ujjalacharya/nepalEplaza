const router = require("express").Router();

const { create, read, categoryById } = require("../controllers/category");
const {requireSignin, isAdmin} = require("../controllers/auth");

router.post("/create", requireSignin, isAdmin, create);
router.route("/:categoryId").get(read);

router.param("categoryId", categoryById);

module.exports = router;
