// 'use strict';


const router = require('../src/api/routes.js');

const rootDir = process.cwd();
const supergoose = require('./supergoose.js');
const {server} = require(`${rootDir}/src/app.js`);
const mockRequest = supergoose.server(server);


describe('api server', () => {

    it('should respond with a 404 on an invalid route', () => {
        
      return mockRequest
        .get('/foo')
        .then(results => {
            console.log('reached')
          expect(results.status).toBe(404);
        }).catch(console.log('hello'));
  
    });

});

describe('api server', () => {

    it('should respond with a 404 on an invalid route', () => {
        // jest.setTimeout(30000);
      return mockRequest
        .get('/bulletin')
        .then(results => {
            console.log('reached')
          expect(results.status).toBe(200);
        }).catch(console.log('hello'));
  
    });

});

