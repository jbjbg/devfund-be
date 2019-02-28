'use strict';

const express = require('express');

const paypal = require('paypal-rest-sdk');
const superagent = require('superagent');

const paymentRouter = express.Router();
let amount = 0;



const addresses = {
  ucla: {
    client_id: 'AWjEaYQGjQb99IhkxZFa79SQSuBx6Z_J83RSBhkmVB9RWpIpLd4TI5yI9psWXE32YXvjSi1Pgcexi0kK',
    client_secret: 'EJus2Ylo66CauLOaPycnHiMB8efYElRTytNxw6bSbyhoH70jgpUO0HnIp6t6BOlDk6CMHJHEYbQ4ezyO'
  },
  apple:{
    client_id: 'AWjEaYQGjQb99IhkxZFa79SQSuBx6Z_J83RSBhkmVB9RWpIpLd4TI5yI9psWXE32YXvjSi1Pgcexi0kK',
    client_secret: 'EJus2Ylo66CauLOaPycnHiMB8efYElRTytNxw6bSbyhoH70jgpUO0HnIp6t6BOlDk6CMHJHEYbQ4ezyO'
  }
};

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AWjEaYQGjQb99IhkxZFa79SQSuBx6Z_J83RSBhkmVB9RWpIpLd4TI5yI9psWXE32YXvjSi1Pgcexi0kK',
  'client_secret': 'EJus2Ylo66CauLOaPycnHiMB8efYElRTytNxw6bSbyhoH70jgpUO0HnIp6t6BOlDk6CMHJHEYbQ4ezyO'
});


paymentRouter.get('/pay', (req, res, next) => {
  // amount = req.body.amount;
  // let item = req.body.item;
  amount = 20;
  let item = "code";


  let payjson = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:8080/success",
        "cancel_url": "http://localhost:8080/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": item,
                "sku": "001",
                "price": amount,
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": amount
        },
        "description": amount
    }]
  };


  // res send to client
  // paylink + payjson

  paypal.payment.create(payjson, function (error, payment) {

    if (error) {
      throw error;
    } else {

        for(let i =0; i < payment.links.length; i++){
          if(payment.links[i].rel === 'approval_url'){
            res.redirect(payment.links[i].href); 
            // res.send(payment.links[i].href);
          }
        }
    }
  });

})


paymentRouter.get('/success', (req,res)=>{
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json ={
      "payer_id": payerId,
      "transactions": [{
          "amount": {
            "currency": "USD",
            "total": amount
          }
      }]
  };
  
  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment){
      if(error){
        console.log(error.response);
        throw error;
      }
      else{
        // adk provider api for token
        // res send client that token

        // add a redirect to the front end if successful
        res.redirect('http://www.google.com');
      }
  })


})

paymentRouter.get('/cancel', (req,res)=> res.send('Cancelled'))

module.exports = paymentRouter;