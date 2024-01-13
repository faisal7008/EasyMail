const express = require("express");
const passport = require("../config/passport-config");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const User = require("../models/User");
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/error" }),
  (req, res) => {
    res.redirect("/auth/success");
  }
);

router.get("/success", async (req, res) => {
  if (req.user) {
    const { name, email, picture } = req.user._json;
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, picture });
      await user.save();
    }
    res.status(200).json({ message: "Successfully Loged In", user });
  } else {
    res.status(403).json({ message: "Not Authorized" });
  }
});

router.get("/failed", (req, res) => {
  res.status(401).json({ message: "Login failure" });
});

router.get("/profile", isAuthenticated, (req, res) => {
  if (req.user) {
    res.status(200).json({ profile: req.user._json });
  } else {
    res.status(403).json({ message: "Not Authorized" });
  }
});

router.get("/logout", isAuthenticated, (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
