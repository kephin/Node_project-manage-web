const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy({
    usernameField: 'name',
  }, (name, password, done) => {
    User.findOne({ name: name.trim() }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { message: 'Incorrect name.' });

      user.checkPassword(password, (err, isMatch) => {
        if (err) return done(err);
        if (!isMatch) return done(null, false, { message: 'Invalid password.' });
        return done(null, user, { message: 'Successfully logged in.' });
      });
    });
  }));
};
