const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, read, update } = require("../controllers/user");
const router = require("express").Router();

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({ auth: req.auth, profile: req.profile });
});

router
  .route("/:userId")
  .get(requireSignin, isAuth, read)
  .put(requireSignin, isAuth, update);

router.param("userId", userById);

module.exports = router;
