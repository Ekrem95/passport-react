const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');
const morgan = require('morgan');
const compression = require('compression');
const dotenv = require('dotenv');

dotenv.load();

mongoose.connect(process.env.mongoDb, { useMongoClient: true });
// const db = mongoose.connection;

const router = require('./routes/router');
const api = require('./routes/api');

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src/public')));

app.use(session({
    secret: process.env.secret,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    saveUninitialized: true,
    resave: false,
    maxAge: 14 * 24 * 3600000,
  }));

app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator());

app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

app.use('/api', api);
app.use('/', router);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'));
