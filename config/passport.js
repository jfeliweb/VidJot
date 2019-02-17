const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose'),
      bcrypt = require('bcryptjs');

// Load user model
const User = mongoose.model('users');

module.exports = (passport) => {
  passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    console.log(email)
    console.log(password)
  }));
}
