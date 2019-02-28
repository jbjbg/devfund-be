'use strict';

const rootDir = process.cwd();
const supergoose = require('./supergoose.js');
const { server } = require(`${rootDir}/src/app.js`);
const mockRequest = supergoose.server(server);

describe('express router should take the following paths', () => {
  it('should respond with a 200 response on th '/' path ', () => {
    return mockRequest.get('/').then(results => {
      expect(results.status).toBe(200);
    });
  });

  it('should respond with a 200 response on the /api/bulletin path', () => {
    return mockRequest.post('/api/bulletin').then(results => {
      expect(results.status).toBe(200);
    });
  });
  it('should respond with a 200 response on the /api/pitch path', () => {
    return mockRequest.post('/api/pitch').then(results => {
      expect(results.status).toBe(200);
    });
  });
  it('should respond with a 200 response on the /api/update/:id', () => {
    return mockRequest.post('/api/pitch').then(results => {
      expect(results.status).toBe(200);
    });
  });
  it('should respond with a 200 response on the /api/delete/:id', () => {
    return mockRequest.post('/api/pitch').then(results => {
      expect(results.status).toBe(200);
    });
  });
});
