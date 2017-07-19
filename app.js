const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');
const morgan = require('morgan');
const compression = require('compression');
const dotenv = require('dotenv');

dotenv.load();

mongoose.connect('mongodb://localhost/loginapp');
const db = mongoose.connection;

const routes = require('./routes/index');
const api = require('./routes/api');

// Init App
const app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src/public')));

// Express Session
app.use(session({
    secret: process.env.secret,
    saveUninitialized: true,
    resave: true,
    maxAge: 20000,
  }));

app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator());

app.use(flash());

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/api', api);
app.use('/', routes);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'));
