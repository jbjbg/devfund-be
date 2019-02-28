'use strict';

const express = require('express');

const paypal = require('paypal-rest-sdk');
const superagent = require('superagent');

const authRouter = express.Router();

const User = require('./user-model.js');
const auth = require('./middleware.js');
 

authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then( (user) => {
      User.findOne({_id: user._id})
        .then(user => {
          req.token = user.generateToken();
          req.user = user;
          res.set('token', req.token);
          res.cookie('auth', req.token);
          res.send({token:req.token, _id: user._id});
        })
    })
    .catch(next);
})

authRouter.post('/signin', auth, (req, res, next) => {
  console.log(`🤯: ${req.headers.authorization}`);
  res.cookie('auth', req.token);
  if(req.headers.authorization) {
    User.findOne({username: req.headers.authorization.username})
    .then(result => res.send({token:req.token, id:result._id}))
  } else {
    res.send(req.token);
  }

});

authRouter.post('/key', auth, (req, res, next) => {
  let key = req.user.generateToken();
  res.status(200).send(key);
});


authRouter.get('/user/:id', auth, (req, res, next) => {
  User.findById(req.params.id)
    .then( result => res.json(result))
    .catch( next );
})

authRouter.post('/user/update/:id', auth, (req, res, next) => {
  console.log(req)
  User.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then( result => res.json(result))
    .catch( next );
})

authRouter.get('/users', (req, res, next) => {
  User.find()
  .then( data => {
    const output = {
      count: data.length,
      results: data,
    };
    res.status(200).json(output);
  })
  .catch( next );
})




module.exports = authRouter;