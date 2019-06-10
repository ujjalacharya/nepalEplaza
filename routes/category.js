const router = require("express").Router();

const { create } = require("../controllers/category");
const {requireSignin, isAdmin} = require("../controllers/auth");

router.post("/category/create", requireSignin, isAdmin, create);

module.exports = router;
