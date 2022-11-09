const passport = require("passport");
const {
  facebookClientID,
  facebookClientSecret,
  googleClientID,
  googleClientSecret,
} = require("../keys");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20");
const userModel = require("../model/userModel");

const passportFacebook = () => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: facebookClientID,
        clientSecret: facebookClientSecret,
        callbackURL:
          "https://keyboardshop.herokuapp.com/api/auth/facebook/callback",
        profileFields: [
          "id",
          "displayName",
          "name",
          "gender",
          "photos",
          "email",
        ],
      },
      async function (accessToken, refreshToken, profile, done) {
        // const user = await userModel.create({
        //   name: profile._json.name,
        //   email: profile._json.email,
        //   password: "123123",
        // });
        // console.log("PRO", profile);
        // console.log("TOKEN", accessToken);
        return done(null, profile);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    return done(null, user);
  });
};

const passportGoogle = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        callbackURL:
          "https://keyboardshop.herokuapp.com/api/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        // const user = await userModel.create({
        //   name: profile._json.name,
        //   email: profile._json.email,
        //   password: "123123",
        // });
        // console.log("PRO", profile);
        // console.log("TOKEN", accessToken);
        return done(null, profile);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    return done(null, user);
  });
};

module.exports = { passportFacebook, passportGoogle };
