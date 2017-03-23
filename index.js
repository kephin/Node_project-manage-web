const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/AccoutApp');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');

const routes = require('./routes/index');
const setUpPassport = require('./config/set-up-passport');
setUpPassport();

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

app.listen(app.get('port'), () => {
  console.log(`Server started on port ${app.get('port')}`);
});
