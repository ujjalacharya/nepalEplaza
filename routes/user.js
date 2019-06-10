const express = require("express");
const router = express.Router();
const { signup, signin, signout, requireSignin } = require("../controllers/user");
const { userSignupValidator } = require("../validator");

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

router.get('/secret', requireSignin, (req, res) => {
 res.json("This is secret...sshhh")
})

module.exports = router;