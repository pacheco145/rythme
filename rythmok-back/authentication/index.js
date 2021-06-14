// Import passport. Authentication library. Middleware
const passport = require("passport");
// Loggins strategies. Sessions by local authentication with user/password
const registerStrategy = require("./register-strategy");
const loginStrategy = require("./login-strategy");
// User model
const User = require("./../models/Users.model");

  // This function will regiter the user information login into session cookie
  passport.serializeUser((user, done) => {    
    return done(null, user._id);
  });
  
  // This function will search an user by ID in DB,and populate req.user if exists
  passport.deserializeUser(async (userId, done) => {
    try {
      const existingUser = await User.findById(userId);
      return done(null, existingUser);
    } catch (err) {
      return done(err);
    }
  });

  
  passport.use('registro', registerStrategy);
  passport.use('acceso', loginStrategy);