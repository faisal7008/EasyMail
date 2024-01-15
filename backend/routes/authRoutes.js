const express = require("express");
const passport = require("../config/passport-config");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const User = require("../models/User");
const router = express.Router();

// http://localhost:9000/auth

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { successRedirect: process.env.CLIENT_URL, failureRedirect: "/auth/error" })
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

router.get("/profile", async (req, res) => {
  if (req.user) {
    const { email } = req.user._json;
    const profile = await User.findOne({ email });
    res.status(200).json({ profile });
  } else {
    res.status(403).json({ message: "Not Authorized" });
  }
});

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.CLIENT_URL);
  });
});

module.exports = router;
