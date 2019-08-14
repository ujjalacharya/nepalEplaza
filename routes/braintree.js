const express = require("express");
const router = express.Router();

const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { generateToken, processPayment } = require("../controllers/braintree");

router.get("/getToken", requireSignin, generateToken);

router.post(
  "/payment",
  requireSignin,
  processPayment
);

router.param("userId", userById);

module.exports = router;
