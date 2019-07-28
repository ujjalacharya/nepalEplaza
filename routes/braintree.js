const express = require("express");
const router = express.Router();

const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { generateToken } = require("../controllers/braintree");

router.get("/getToken", requireSignin, generateToken);

router.param("userId", userById);

module.exports = router;
