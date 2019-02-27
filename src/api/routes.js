'use strict'

// const cwd = process.cwd();

const express = require('express');
const router = express.Router();
console.log('hooked up')

// const modelFinder = require('../middleware/model-finder.js');
const fund_me_model = require('../models/requests/fundme-model');

// router.param('model', modelFinder);
router.get('/', (req, res, next) => {
  res.send('hello world');
})
router.get('/api/bulletin', handleGetAll);
router.post('/api/pitch', handleCreate);
router.put('/api/update/:id', handlePut);
router.delete('/api/delete/:id', handleDelete);

function bullshit(){
  return 'fuck this shit I quit';
}

function handleGetAll(req, res, next) {

  fund_me_model.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      res.status(200).json(output);
    })
    .catch( next );
}

function handleCreate(req, res, next) {
  console.log('before handleCreate post')
  fund_me_model.post(req.body)
    .then( result => res.status(200).json(result) )
    .catch( next );
}

function handlePut(req, res, next) {
  fund_me_model.put(req.params.id, req.body)
    .then( result => res.status(200).json(result) )
    .catch(next);
}

function handleDelete(req, res, next) {
  fund_me_model.delete(req.params.id)
    .then( result => res.status(200).json(result) )
    .catch(next);
}


module.exports = handleGetAll;