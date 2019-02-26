'use strict';

const express = require('express');

const authRouter = express.Router();

const cwd = process.cwd();
const User = require('./user-model.js');
const auth = require('./middleware.js');


authRouter.post('./signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then( (user) => {
      User.findOne({_id: user._id})
        .then(user => {
          req.token = user.generateToken();
          req.user = user;
          res.set('token', req.token);
          res.cookie('auth', req.token);
          res.send(req.token);
        })
    })
    .catch(next);
})

authRouter.post('/signin', auth(), (req, res, next) => {
  res.cookie('auth', req.token);
  res.send(req.token);

});

authRouter.post('/key', auth, (req, res, next) => {
  let key = req.user.generateToken();
  res.status(200).send(key);
});

module.exports = authRouter;