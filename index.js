const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/AccoutApp');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

const routes = require('./routes/index');
const users = require('./routes/users');
const setUpPassport = require('./config/set-up-passport');
setUpPassport();

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'hello_world',
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/', routes);
app.use('/', users);

app.listen(app.get('port'), () => {
  console.log(`Server started on port ${app.get('port')}`);
});
