const LocalStrategy = require('passport-local').Strategy;
const User = require('./../models/Users.model');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validatePass = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return re.test(String(password));
}

// Register Strategy Function
const registerStrategy = new LocalStrategy(
    {
        // This first part is the configuration how information is received
        usernameField: "email", //these names came from client app chosen name (body)
        passwordField: "password",
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        // This second parameter callback from passport with the configured parameters
        // Registration logic
        try {
            // 1. Check user does not exist.
            // 2. Encript password.
            // 3. Create User instance with user data.
            // 4. User.save save user into DB

            const existingUser = await User.findOne({ email: email });            

            if (existingUser) {
                // No registrar al usuario
                const error = new Error("The user is already register");
                return done(error);
            }

            const isValidEmail = validateEmail(email);
            // Validating Email
            if (!isValidEmail) {
                const error = new Error(
                    "Invalid email"
                );
                return done(error);
            }

            const isValidPassword = validatePass(password);            
            if (!isValidPassword) {
                const error = new Error(
                    "La contraseña tiene que contener de 6 a 20 carácteres, una mayúscula, una minúscula y un número"
                );
                return done(error);
            }

            // Encrypting user password.
            const hash = await bcrypt.hash(password, saltRounds);

            const image = req.image_url ? req.image_url : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
            console.log('\n\n\n', req.image_url);
            // Instance new oobject User Class
            const newUser = new User({
                username: req.body.username,
                email: email,
                password: hash,                     
            });

            // Save into DB
            const savedUser = await newUser.save();

            // Done is like Next.
            return done(null, savedUser);
        } catch (error) {
            return done(error);
        }
    }
);

module.exports = registerStrategy;

