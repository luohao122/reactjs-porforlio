const jwt = require("jwt-simple");
const User = require("../models/user");
const config = require("../config");

// Function to take userID and encode it
function tokenForUser(user) {
  // Timestamp when token was issued
  const timestamp = new Date().getTime();

  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function (req, res, next) {
  // User has already had their email and password authenticated
  // need to provide them a token
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function (req, res, next) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!name || !email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide name, email and password " });
  }

  // Check if a user with given email exists
  User.findOne({ email: email }, function (err, existingUser) {
    // Handle if connection to db was lost
    if (err) {
      return next(err);
    }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: "Email is already in use" });
    }

    // If a user with email does not exist, create and save record
    const user = new User({
      name: name,
      email: email,
      password: password,
    });

    user.save(function (err) {
      if (err) {
        return next(err);
      }

      // Respond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
};
