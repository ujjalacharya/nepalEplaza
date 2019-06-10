const router = require("express").Router();
const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/secret/:userId", requireSignin, (req, res) => {
  res.json({ auth: req.auth, profile: req.profile });
});

router.param("userId", userById);

module.exports = router;
