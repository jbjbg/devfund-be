'use strict';

module.exports = (req,res,next) => {
  let error = { error: 'Resource Not Found' };
  console.log('from 404');
  res.status(404).json(error);
};