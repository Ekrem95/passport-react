const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.post('/logout', function (req, res) {
  req.logout();
  res.send({ message: 'logout' });
});

router.get('*', ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

router.post('/signup', function (req, res) {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    res.send({
      errors: errors,
    });
  } else {
    const newUser = new User({
      email: email,
      username: username,
      password: password,
    });

    User.createUser(newUser, function (err, user) {
      if (err) {
        res.send({ err: err });
        return;
      }

      passport.authenticate('local', { failureRedirect: '/login' });
      (req, res) => {
        const user = req.user;
        const token = jwt.sign({ user }, process.env.secret);
        res.send({ token: token });
      };

    });

  }
});

passport.use(new LocalStrategy(
  function (email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, { message: 'Unknown User' });
      }

      User.comparePassword(password, user.password, function (err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Invalid password' });
        }
      });
    });
  }));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.getUserById(id, function (err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function (req, res) {
    const user = req.user;
    const token = jwt.sign({ user }, process.env.secret);
    res.send({ token: token });
  });

module.exports = router;
