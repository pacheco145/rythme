const LocalStrategy = require('passport-local').Strategy;
const User = require('./../models/Users.model');
const bcrypt = require('bcrypt');

const loginStrategy = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        try {
            //Search user
            const existingUser = await User.findOne({ email });

            if (!existingUser) {
                const error = new Error("User does not exist");
                error.status = 401;
                return done(error);
            }
            
            // Check if user exists, and check if sent paswword matchs with the stored one in database
            const isValidPassword = await bcrypt.compare(password, existingUser.password);

            if(!isValidPassword) {
                const error = new Error('Invalid Password');
                return done(error);
            }

            return done(null, existingUser);

        } catch (error) {
            return done(error);
        }
    }
);

module.exports = loginStrategy;