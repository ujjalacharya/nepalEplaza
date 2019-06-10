const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const router = require("express").Router();

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({ auth: req.auth, profile: req.profile });
});

router.param("userId", userById);

module.exports = router;