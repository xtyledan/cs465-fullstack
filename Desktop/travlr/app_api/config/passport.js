const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');

// Configure the local strategy for use by Passport
passport.use(new LocalStrategy({
    usernameField: 'email'  // Use email as username field
  },
  async (email, password, done) => {
    try {
      // Find user by email
      const user = await User.findOne({ email: email });
      
      if (!user) {
        // User not found
        return done(null, false, { message: 'Incorrect email or password' });
      }
      
      // Check if password is valid
      if (!user.validPassword(password)) {
        // Password is incorrect
        return done(null, false, { message: 'Incorrect email or password' });
      }
      
      // Authentication succeeded
      return done(null, user);
    } catch (error) {
      // Error occurred during authentication
      return done(error);
    }
  }
));
