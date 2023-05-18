const passport = require("passport");
const { Strategy } = require("passport-local");
const { comparePassword } = require("../utils/helpers");
const { getUserById } = require("../utils/controllers");
const User = require("../database/schemas/UserSchema");

passport.serializeUser((user, done) => {
  console.log("Serializing user...");
  done(null, user);
});

passport.deserializeUser((userId, done) => {
  console.log("Deserializing user...");

  try {
    const userData = getUserById;
    if (!userData) throw new Error("User not found!");
    done(null, userData);
  } catch (err) {
    console.log(err);
    done(err, false);
  }
});

passport.use(
  new Strategy(
    {
      usernameField: "email",
    },

    async (email, password, done) => {
      try {
        if (!email || !password) throw new Error("Missing credentials");

        const userData = await User.findOne({ email });
        if (!userData) throw new Error("User not found!");
        // console.log(userData);
        // console.log(userData.password)
        const isValid = comparePassword(password, userData.password);

        if (isValid) {
          console.log("User Authenticated Succesfully!");
          done(null, userData);
        } else {
          console.log("Authentication Failed!");
          done(null, false);
        }
      } catch (error) {
        console.log(error);
        done(error, false);
      }
    }
  )
);
