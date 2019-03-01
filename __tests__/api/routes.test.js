'use strict';

const supergoose = require('../supergoose.js');
const { server } = require(`../../src/app.js`);
const mockRequest = supergoose.server(server);
const pitchMock = require('./lib/pitch.json');
beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);
let pitch_id;



describe('Testing the API Router', () => {
  test('GET at root path should return a 200', () => {
    return mockRequest.get('/').then(results => {
      expect(results.status).toBe(200);
    });
  });


  test('GET at root path proof of life', () => {
    return mockRequest.get('/').then(results => {
      expect(results.res.text).toEqual('alive');
    });
  });

  test('GET at /api/bulletin should return a 200', () => {
    return mockRequest.get('/api/bulletin')
    .then(results => {
      expect(results.status).toBe(200);
    })
    .catch( err => console.log(err))
  });

  test('POST at /api/pitch with mock pitch json should create pitch and return 200', () => {
    return mockRequest.post('/api/pitch').send(pitchMock).then(results => {
      expect(results.status).toBe(200);
    });
  });


  test('POST at /api/pitch with mock pitch json should create pitch and return new pitch object', () => {
    return mockRequest.post('/api/pitch').send(pitchMock).then(results => {
      expect(results.body.item).toEqual(pitchMock.item);
    });
  });

  test('PUT at /api/update/:id should return 200', () => {

    return mockRequest.post('/api/pitch').send(pitchMock).then(results => {
      pitch_id = results.body._id;
    }).then(data => {
      pitchMock.item = "itemchanged";
      return mockRequest.put(`/api/update/${pitch_id}`).send(pitchMock).then(results => {
        expect(results.status).toBe(200);
      });
    })
  });

  test('PUT at /api/update/:id should update the pitch in DB', () => {
    return mockRequest.post('/api/pitch').send(pitchMock).then(results => {
      pitch_id = results.body._id;
    }).then(data => {
      pitchMock.item = "itemchanged";
      return mockRequest.put(`/api/update/${pitch_id}`).send(pitchMock).then(results => {
        expect(results.body.item).toEqual('itemchanged');
      });
    })
  });

  test('DELETE at /api/delete/:id should return a 200', () => {
    return mockRequest.post('/api/pitch').send(pitchMock).then(results => {
      pitch_id = results.body._id;
    }).then(data => {
      return mockRequest.delete(`/api/delete/${pitch_id}`).then(results => {
        expect(results.status).toBe(200);
      });
    })
  });


  test('DELETE at /api/delete/:id should delete the pitch item from the database', () => {
    return mockRequest.post('/api/pitch').send(pitchMock).then(results => {
      pitch_id = results.body._id;
    })
    .then(data => {
      return mockRequest.delete(`/api/delete/${pitch_id}`).then(results => {
      });
    })
    .then(data => {
      return mockRequest.get(`/api/retrieve/${pitch_id}`).then( results => {
        expect(results.body).toEqual('');
      })
    })
  });

  test('GET at /api/retrieve/:id should return 200', () => {
    return mockRequest.post('/api/pitch').send(pitchMock).then(results => {
      pitch_id = results.body._id;
    })
    .then(data => {
      return mockRequest.get(`/api/retrieve/${pitch_id}`).then(results => {
        expect(results.status).toBe(200);
      })
    })
  })


  test('GET at /api/retrieve/:id should return the right object from the database', () => {
    return mockRequest.post('/api/pitch').send(pitchMock).then(results => {
      pitch_id = results.body._id;
    })
    .then(data => {
      return mockRequest.get(`/api/retrieve/${pitch_id}`).then(results => {
        expect(results.body.city).toEqual('test city');
      })
    })
  })


});
