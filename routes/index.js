const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.use((req, res, next) => {
  res.locals.currentUser = req.user || null;
  next();
});

router.get('/', (req, res, next) => {
  User.find()
    .sort({ createdAt: 'descending' })
    .exec((err, users) => {
      if (err) return next(err);
      res.render('index', { users });
    });
});

module.exports = router;
