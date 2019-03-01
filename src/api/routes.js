'use strict'


const express = require('express');
const router = express.Router();

const fund_me_model = require('../models/requests/fundme-model');

router.get('/', (req, res, next) => {
  res.send('alive');
})
router.get('/api/bulletin', handleGetAll);
router.post('/api/pitch', handleCreate);
router.put('/api/update/:id', handlePut);
router.delete('/api/delete/:id', handleDelete);
router.get('/api/retrieve/:id', handleGetOne);


function handleGetAll(req, res, next) {
  fund_me_model.get()
    .then( data => {
      if(data){
        const output = {
          count: data.length,
          results: data,
        };
        res.status(200).json(output);
      }else {
        res.status(200).send('no items found');
      }

    })
    .catch( next );
}

function handleGetOne(req, res, next) {
  fund_me_model.get(req.params.id)
    .then( result => {res.status(200).json(result[0]);})
    .catch( next );
}

function handleCreate(req, res, next) {
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

module.exports = router;