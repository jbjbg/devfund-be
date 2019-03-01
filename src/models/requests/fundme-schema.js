'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema');

const fund_me = mongoose.Schema({
  item: { type: String, required: true },
  price: { type: String, required: true },
  pitch: { type: String, required: true },
  username: { type: String, required: true },
  user_id: { type: String },
  firstname: { type: String },
  city: { type: String},
  bio: { type: String },
  github: { type: String},
  image: { type: String, data: Buffer },
  linkedin: { type: String },
  twitter: { type: String },
  blog: { type: String },
  post_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('fund_me', fund_me );

