const express = require("express");
const router = express.Router();
const passport = require("passport");
const userModel = require("../model/userModel");
const generateToken = require("../unitls/generateToken");

router.get(
  "/",
  passport.authenticate("facebook", {
    authType: "reauthenticate",
    scope: ["user_friends", "user_likes"],
  })
);

router.get(
  "/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/",
    successRedirect: "/api/auth/facebook/home",
  }),
  function (req, res) {
    req.user = user;
    console.log("this user --- ", user);

    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

router.get("/home", async (req, res, next) => {
  // const userOfApp = await userModel.findOne({ email: req.user._json.email });
  res.render("homeFacebook", {
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
