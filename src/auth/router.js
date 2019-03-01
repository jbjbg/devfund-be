'use strict';

const express = require('express');

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
          res.json({token:req.token, _id: user._id});
        })
    })
    .catch(next);
})

authRouter.post('/signin', auth, (req, res, next) => {

  let [authType, authString] = req.headers.authorization.split(/\s+/);

  res.cookie('auth', req.token);
  if(authType.toLowerCase() === "basic") {
    let base64Buffer = Buffer.from(authString, 'base64');
    let bufferString = base64Buffer.toString();
    let [username, password] = bufferString.split(':');
    User.findOne({username: username})
    .then(result => res.json({token:req.token, id:result._id}))
  } else {
    res.send(req.token);
  }

});

authRouter.post('/key', auth, (req, res, next) => {
  let key = req.user.generateToken();
  res.status(200).send(key);
});


authRouter.get('/user/:id', auth, (req, res, next) => {
  let [authType, authString] = req.headers.authorization.split(/\s+/);

  
  User.findById(req.params.id)
    .then( result => res.json(result))
    .catch( next );
})

authRouter.put('/user/update/:id', auth, (req, res, next) => {
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