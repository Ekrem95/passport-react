const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const Twit = require('twit');

const User = require('../models/user');

router.get('/user', (req, res) => {
  if (req.user) {
    const user = req.user;
    const token = jwt.sign({ user }, process.env.secret);
    res.status(200).send({ username: user.username, token: token });
  } else {
    res.status(404).send({ user: null, token: null });
  }
});

const T = new Twit({
  consumer_key:         process.env.consumer_key,
  consumer_secret:      process.env.consumer_secret,
  access_token:         process.env.access_token,
  access_token_secret:  process.env.access_token_secret,
  timeout_ms:           60 * 1000,  // optional HTTP request timeout to apply to all requests.
});

router.get('/tweets', (req, res) => {
  const day = new Date().toISOString().substring(0, 10);
  T.get('search/tweets', {
    q: 'chelsea since:' + day,
    count: 6,
    lang: 'en',
    result_type: 'popular',
  }, (err, data, response) => {
    res.send(data);
  });
});

module.exports = router;
