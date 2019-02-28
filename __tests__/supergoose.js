'use strict';


const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').default;
const supertest = require('supertest');

let mongoServer;

let supergoose = module.exports = {};


supergoose.server = (server) => supertest(server);
supergoose.stopDB = () => {
 
  mongoServer.stop();
};


// Just so that it can live in the tests folder
describe('supergoose', () => {
  it('is super', () => {
    expect(true).toBeTruthy();
  });
});