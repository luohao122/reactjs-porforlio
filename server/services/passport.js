const passport = require("passport");
const User = require("../models/user");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

// Create local strategy
// Tell local strategy to look at email instead of username field to verify
const localOptions = { usernameField: "email" };

const localLogin = new LocalStrategy(localOptions, function (
  email,
  password,
  done
) {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  User.findOne({ email: email }, function (err, user) {
    // Error happened while searching
    if (err) {
      return done(err);
    }

    // User not found
    if (!user) {
      return done(null, false);
    }

    // Compare password - if password provided by user is match
    // with user.password
    user.comparePassword(password, function (err, isMatch) {
      // Error while comparing
      if (err) {
        return done(err);
      }

      // If password not match return false
      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret,
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // Check if user ID in the payload exists in our database
  // If it does, call 'done' with that user
  // otherwise, call done without a user object
  User.findById(payload.sub, function (err, user) {
    // Call done when there is an error with connection to DB
    if (err) {
      return done(err, false);
    }

    if (user) {
      // Call done when found user and no error
      done(null, user);
    } else {
      // Call done when not found user
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
