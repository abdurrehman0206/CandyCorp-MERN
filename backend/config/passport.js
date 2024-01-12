const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const USER = require("../model/userModel");

//Local Strategy
// passport.use('local',
//   new LocalStrategy(
//     { usernameField: "email" },
//     async (email, password, done) => {
//       try {
//         const user = await USER.login(email, password);
//         return done(null, user);
//       } catch (error) {
//         return done(null, false, { message: error.message });
//       }
//     }
//   )
// );

// Google Strategy
passport.use(
  "google-login",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await USER.googleLogin(
          profile.id,
          profile.emails[0].value,
          profile.displayName,
          profile.username,
          profile.photos[0].value
        );
        console.log("🚀 ~ user:", user)

        return done(null, user);
      } catch (error) {
        console.log("🚀 ~ error:", error)
        return done(error, false, {
          message: "Error during Google authentication",
        });
      }
    }
  )
);

// Serialize user to store in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await USER.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
