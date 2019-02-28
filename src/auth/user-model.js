'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');
const uuid = require('uuid');

const SINGLE_USE_TOKENS = !!process.env.SINGLE_USE_TOKENS;
const TOKEN_EXPIRE = process.env.TOKEN_LIFETIME || '30m';
const SECRET = process.env.SECRET || 'foobar';

const usedTokens = new Set();

const users = new mongoose.Schema({

  key: {type: String, default: uuid()},
  username: { type: String, required:true, unique:true },
  password: { type: String, required:true },
  // firstname: { type: String, required:true },
  // lastname: { type: String, required:true },
  // email: { type: String, required:true },
  // phone: { type: String },
  // address1: { type: String },
  // address2: { type: String },
  // state: { type: String },
  // city: { type: String, required:true },
  // zip: { type: String },
  // github: { type: String },
  // linkedin: { type: String },
  // twitter: { type: String },
  // blog: { type: String },
  // image: { type: Buffer },
  // bio: { type: String }
});

users.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch(error => {throw new Error(error)});
});

users.statics.createFromOauth = function(email) {
  if(!email) { return Promise.reject('Validation Error'); }

  return this.findOne( {email} )
    .then(user => {
      if(!user) { throw new Error('User Not Found'); }
      return user;
    })
    .catch( error => {
      let username = email;
      let password = 'none';
      return this.create({username, password, email});
    });
};
// users.statics.get = function(_id) {
//   console.log(this);
//   return this.findOne( {_id} )
//     .then(user => {
//       if(!user) { throw new Error('User Not Found'); }
//       return user;
//     })
//     .catch( error => {
//       throw error;
//     });
// };

users.statics.authenticateToken = function(token) {
  
  if(usedTokens.has(token)) {


    return Promise.reject('Invalid Token');
  }

  try {
    let parsedToken = jwt.verify(token, SECRET);

    (SINGLE_USE_TOKENS) && parsedToken.type !== 'key' && usedTokens.add(token);

    let query = {_id: parsedToken.id};
    return this.findOne(query);
  } catch(e) { throw new Error('Invalid Token'); }

};

users.statics.authenticateBasic = function(auth) {
  let query = {username:auth.username};
  return this.findOne(query)
    .then( user => user && user.comparePassword(auth.password) )
    .catch(error => {throw error;});
};


users.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password)
    .then( valid => valid ? this : null);
};

users.methods.generateToken = function(type) {
  let token = {
    id: this._id,
  };

  let options = {};
  if ( type !== 'key' && !! TOKEN_EXPIRE ) {
    options = { expiresIn: TOKEN_EXPIRE };
  }

  return jwt.sign(token, SECRET, options);
};

users.methods.generateKey = function() {
  return this.generateToken('key');
};



// class Model {
//   constructor(schema) {
//     this.schema = schema;
//   }
//   get(_id) {
//     let queryObject = _id ? {_id} : {};
//     return this.schema.find(queryObject);
//   }

//   post(record) {
//     let newRecord = new this.schema(record);
//     console.log(util.inspect(newRecord,{depth: 10}));
//     return newRecord.save(newRecord);
//     console.log('⭕️');
//   }

//   put(_id, record) {
//     return this.schema.findByIdAndUpdate(_id, record, {new:true});
//   }

//   delete(_id) {
//     return this.schema.findByIdAndDelete(_id);
//   }
  
// }

module.exports = mongoose.model('users', users);