require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash')
const fileUpload = require("express-fileupload");
const connectDB = require('./helpers/db');

// Connect Database
connectDB();

// Initialize App
const app = express();

// Passport Config
require('./helpers/passport')(passport);

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Log Routes
app.use(logger('dev'));

// Express Session
app.use(session({
  secret: 'harisiqbal',
  resave: true,
  saveUninitialized: true
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// MiddleWares
app.use(express.urlencoded({ extended: false }));
app.use(express.json({extended: false}));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "public")));
app.use(cors());
app.use(fileUpload({ useTempFiles: true, tempFileDir: path.join(__dirname, 'temp') }));

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');            // Error from Passport
  res.locals.user = req.user;
  next();
});

// Define Routes
app.get('/', (req, res) => res.status(200).send('Server Running'));
app.use('/api', require('./routes/api'));
app.use('/admin', require('./routes/admin'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
