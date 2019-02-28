'use strict';

const User = require('./user-model.js');
const util = require('util');

module.exports = (req, res, next) => {
  // return  (req, res, next) => {
    console.log('🐋');
    try {
      let [authType, authString] = req.headers.authorization.split(/\s+/);
      console.log(`authType: ${authType}`);
      console.log(`authString 🤯: ${authString} 🌶`);

      switch (authType.toLowerCase()) {
        case 'basic':
          return _authBasic(authString);
        case 'bearer':
          return _authBearer(authString);
        default:
          return _authError();
      }
    } catch (e) {
      _authError();
    }

    function _authBasic(str) {
      let base64Buffer = Buffer.from(str, 'base64');
      let bufferString = base64Buffer.toString();
      let [username, password] = bufferString.split(':');
      let auth = {username, password};

      console.log(auth);

      return User.authenticateBasic(auth)
        .then(user => _authenticate(user))
        .catch(_authError);
    }

    function _authBearer(authString) {
      console.log('In _authBearer');
      console.log(authString);

      return User.authenticateToken(authString)
        .then(user => _authenticate(user))
        .catch(_authError);
    }

    
    function _authenticate(user) {
      console.log('🐅');
      if ( user ) {
        req.user = user;
        req.token = user.generateToken();
        next();
      }
      else {
        _authError();
      }
    }

    function _authError() {
      next('Invalid User ID/Password');
    }


  // }




};