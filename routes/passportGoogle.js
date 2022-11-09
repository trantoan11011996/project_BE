const express = require("express");
const router = express.Router();
const passport = require("passport");
const userModel = require("../model/userModel");
const generateToken = require("../unitls/generateToken");

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/api/auth/google/home",
  }),
  function (req, res) {
    req.user = user;
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

router.get("/home", async (req, res, next) => {
  // const userOfApp = await userModel.findOne({ email: req.user._json.email });
  res.render("homeGoogle", {
    user: req.user,
    // email: userOfApp.email,
    // name: userOfApp.name,
    // token: generateToken(userOfApp._id),
  });
  // res.json({
  //   email: userOfApp.email,
  //   name: userOfApp.name,
  //   token: generateToken(userOfApp._id),
  // });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
