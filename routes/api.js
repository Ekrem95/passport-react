const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.get('/user', (req, res) => {
  if (req.user) {
    const user = req.user;
    const token = jwt.sign({ user }, process.env.secret);
    res.send({ user: user.username, token: token });
  } else {
    res.send({ user: null, token: null });
  }
});

module.exports = router;
