const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/user');

// Sign up
router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {
  const name = req.body.name.trim();
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (confirmPassword !== password) {
    res.redirect('/signup');
  }

  User.findOne({ name }, (err, user) => {
    if (err) return next(err);
    if (user) {
      res.redirect('/signup');
    }
    const newUser = new User({ name, email, password });
    newUser.save(next);
  });
  //log in if sign up successfully
}, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/signup',
}));

// Log in / log out
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
