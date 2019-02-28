'use strict';
const rootDir = process.cwd();
const supergoose = require('./supergoose.js');
const { server } = require(`${rootDir}/src/app.js`);
const mockRequest = supergoose.server(server);

describe('app.js should call route the following paths', () => {
  it('should respond with a 404 erro on an unknown path', () => {
    return mockRequest.get('/foo').then(results => {
      expect(results.status).toBe(404);
    });
  });
});

it('should respond with a 500 error on an /api/delete/25sdfds path', () => {
  return mockRequest.delete('/api/delete/25sdfds').then(results => {
    expect(results.status).toBe(500);
  });
});
