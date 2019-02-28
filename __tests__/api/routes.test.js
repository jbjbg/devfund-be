'use strict';

const rootDir = process.cwd();
const util = require('util');
const supergoose = require('../supergoose.js');
const { server } = require(`../../src/app.js`);
const mockRequest = supergoose.server(server);
const pitchMock = require('./pitch.json');
console.log(`🎡${util.inspect(pitchMock,{showHidden:true})}`);
beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);


describe('express router should take the following paths', () => {
  it('should respond with a 200 response on the / path ', () => {
    return mockRequest.get('/').then(results => {
      expect(results.status).toBe(200);
    });
  });


  it('Should receive hello world', () => {
    return mockRequest.get('/').then(results => {
      expect(results.res.text).toEqual('hello world');
    });
  });

  it('should respond with a 200 response on the /api/bulletin path', () => {
    return mockRequest.get('/api/bulletin')
    .then(results => {
      expect(results.status).toBe(200);
    })
    .catch( err => console.log(err))

  });

  it('should respond with a 200 response on the /api/pitch path', () => {
    return mockRequest.post('/api/pitch', pitchMock).then(results => {
      expect(results.status).toBe(200);
    });
  });
  // it('should respond with a 200 response on the /api/update/:id', () => {
  //   return mockRequest.post('/api/pitch').then(results => {
  //     expect(results.status).toBe(200);
  //   });
  // });
  // it('should respond with a 200 response on the /api/delete/:id', () => {
  //   return mockRequest.post('/api/pitch').then(results => {
  //     expect(results.status).toBe(200);
  //   });
  // });
});
