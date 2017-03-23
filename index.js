const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/AccoutApp');
const path = require('path');

const routes = require('./routes/index');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', routes);

app.listen(app.get('port'), () => {
  console.log(`Server started on port ${app.get('port')}`);
});
