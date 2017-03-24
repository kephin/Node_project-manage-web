const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

const { config } = require('./config/config');
const { mongoose } = require('./database/mongoose');
const routes = require('./routes/index');
const users = require('./routes/users');
const setUpPassport = require('./config/set-up-passport');
setUpPassport();

const app = express();

const port = process.env.PORT;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/', routes);
app.use('/', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
if (process.env.NODE_ENV === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      error: err,
    });
  });
}

// production error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    error: err.message,
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
