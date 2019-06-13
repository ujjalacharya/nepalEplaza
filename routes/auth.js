const {
  signup,
  signin,
  signout,
  refreshToken
} = require("../controllers/auth");
const { userSignupValidator } = require("../validator");
const express = require("express");
const router = express.Router();

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

router.post("/refresh-token", refreshToken);

module.exports = router;
