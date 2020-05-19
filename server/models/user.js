const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

// Define user model
const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre("save", function (next) {
  // Get access to the user model via user
  const user = this;

  // Generate a salt then run callback
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    // Hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      // Overwrite plain text password with encrypted password
      user.password = hash;

      // Proceed to save password
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

// Create user model class
const ModelClass = mongoose.model("user", userSchema);

// Export user model
module.exports = ModelClass;
