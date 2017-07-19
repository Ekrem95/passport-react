const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

router.get('/user', (req, res) => {
  if (req.user) {
    res.send({ user: req.user.username });
  } else {
    res.send({ user: null });
  }
});

module.exports = router;
