const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_FACTOR = 10;

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, SALT_FACTOR)
    .then(hash => {
      user.password = hash;
      next();
    })
    .catch(err => next(err));
});

UserSchema.methods.checkPassword = function (guess, next) {
  const user = this;
  bcrypt.compare(guess, user.password, (err, isMatch) => {
    next(err, isMatch);
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
