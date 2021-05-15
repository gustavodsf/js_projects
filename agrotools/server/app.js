'use strict';
// server.js
// Configure the server
const express       = require('express');
const path          = require('path');
const favicon       = require('serve-favicon');
const logger        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const mockgoose     = require('mockgoose');

const router        = require('./app/router');
const db            = require('./config/database');
const Const         = require('./config/const');
const auth          = require('./config/auth');
var cors          = require('cors')
const app           = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors())
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true,
}));

app.use(express.static(path.join(__dirname, 'public')));

// configure mongoose
if(process.env.NODE_ENV === Const.test) {
  mockgoose(mongoose).then(() => {
    mongoose.connect(db.url, (err) => {
      if (err)
        console.log(err);
    });
  });
}
else {
  mongoose.connect(db.url);
}
mongoose.Promise = global.Promise;

app.isTest = function() {
  return process.env.NODE_ENV === Const.test;
}
app.isMocked = function() {
  return mongoose.isMocked;
}

// secret variable
app.set('secret', auth.secret);

// Configure routes
router.configure(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
