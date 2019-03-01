'use strict';

const rootDir = process.cwd();
const util = require('util');
const supergoose = require('../supergoose.js');
const { server } = require(`../../src/app.js`);
const mockRequest = supergoose.server(server);
const pitchMock = require('./lib/pitch.json');
console.log(`🎡${util.inspect(pitchMock,{showHidden:true})}`);
beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);
let pitch_id;

mockRequest.post('/api/pitch').send(pitchMock).then(results => {
  pitch_id = results.body._id;
  console.log(pitch_id);
  return;
})

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
    return mockRequest.post('/api/pitch').send(pitchMock).then(results => {
      expect(results.status).toBe(200);
    });
  });


  it('the response body should contain the object json', () => {
    return mockRequest.post('/api/pitch').send(pitchMock).then(results => {
      // console.log(`🤙${util.inspect(results.res.text,{showHidden:true, depth: 25})}`)
      console.log(`🤙${util.inspect(results.body,{showHidden:true, depth: 25})}`)
      expect(results.body.item).toEqual(pitchMock.item);
    });
  });

  it('should respond with a 200 response on the /api/update/:id', () => {
    // mockRequest.post('/api/pitch').send(pitchMock).then()
    pitchMock.item = "itemchanged";
    console.log(`🍕:${pitchMock.item}`);
    return mockRequest.put(`/api/update/pitch/${pitch_id}`).send(pitchMock).then(results => {
      console.log(`🍔${util.inspect(results.body,{ showHidden: true })}`)
      expect(results.body.item).toEqual('itemchanged');
    });
  });

  // it('should respond with a 200 response on the /api/delete/:id', () => {
  //   return mockRequest.post('/api/pitch').then(results => {
  //     expect(results.status).toBe(200);
  //   });
  // });
});
