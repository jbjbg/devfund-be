'use strict';

const supergoose = require('../supergoose');
const { server } = require('../../src/app.js');
const mockRequest = supergoose.server(server);
const PaymentId = { id: 'PAYID-LR4IKXI2FV113041A081702W',
intent: 'sale',
state: 'created',
payer: { payment_method: 'paypal' },
transactions:
 [ { amount: { total: '20.00', currency: 'USD' },
     description: '20',
     item_list:
      { items:
         [ { name: 'code',
             sku: '001',
             price: '20.00',
             currency: 'USD',
             quantity: 1 } ] },
     related_resources: [] } ],
create_time: '2019-03-01T01:05:32Z',
links:
 [ { href:
      'https://api.sandbox.paypal.com/v1/payments/payment/PAYID-LR4IKXI2FV113041A081702W',
     rel: 'self',
     method: 'GET' },
   { href:
      'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-14F29073UK194424R',
     rel: 'approval_url',
     method: 'REDIRECT' },
   { href:
      'https://api.sandbox.paypal.com/v1/payments/payment/PAYID-LR4IKXI2FV113041A081702W/execute',
     rel: 'execute',
     method: 'POST' } ],
httpStatusCode: 201 }

describe('Payment should do the following things',()=>{
   it('should hit the /pay route return 302',()=>{
       return mockRequest.post('/pay').then(results => {
           expect(results.status).toBe(302);
         });

   })

   xit('should hit the /success route and return 302', ()=>{
       return mockRequest.get('/success').then(result=>{
           expect(result.status).toBe(302);
        afterAll(() => supergoose.disconnect());

       })
   })

})

// beforeAll(supergoose.startDB);
// afterAll(supergoose.stopDB);