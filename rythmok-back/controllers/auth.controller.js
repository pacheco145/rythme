const passport = require('passport');

module.exports = {
  checkSession: async (req, res, next) => {
    if (req.user) {
      let userRegister = req.user;
      userRegister.password = null;
      return res.status(200).json(userRegister);
    } else {
      return res.status(401).json({ message: 'No user found' });
    }
  },

  registerPost: (req, res, next) => {
    console.log('Llega petición');
    const { password, email, username } = req.body;

    if(!password || !email || !username) {
      return res.status(400).json({ message: 'Completa todos los campos' });
    }

    passport.authenticate("registro", (error, user) => {
      if (error) {
        return res.status(403).json({message: error.message});
      }

      req.logIn(user, (error) => {
        if (error) {
          return res.status(403).json({message: error.message});
        };

        let userRegister = user;
        userRegister.password = null;

        return res.json(userRegister);
      });
    })(req, res, next);
  },

  loginPost: (req, res, next) => {
    passport.authenticate('acceso', (error, user) => {
      if (error) {
        return next(error);
      }

      req.logIn(user, (error) => {
        if (error) {
          return next(error);
        }
        // return res.redirect('/')
        return res.status(200).json('User logged successfully');
      });
    })(req);
  },

  logoutPost: (req, res, next) => {
    if (req.user) {
      req.logout();

      req.session.destroy(() => {
        res.clearCookie('connect.sid');

        // return res.redirect('/');
        return res.status(200).json('Session closed');
      });
    } else {
      return res.status(200).json('No user logged');
    }
  },
};
