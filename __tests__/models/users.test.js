'use strict';

process.env.STORAGE = 'mongo';
const jwt = require('jsonwebtoken');
const server = require('../../src/app').server;
const supergoose = require('../supergoose.js');
const mockRequest = supergoose.server(server);
const rootDir = process.cwd();
const users = require(`${rootDir}/src/auth/user-model.js`);

let user = {
  username: 'paul',
  password: 'password',
  firstname: 'paul',
  lastname: 'bunion',
  email: 'email@gmail.com',
  phone: '425555-5555',
  address1: 'address1',
  address2: 'address2',
  state: 'wa',
  city: 'lynnwood',
  zip: '98125',
  github: 'gitout.com',
  linkedin: 'linkin.com',
  twitter: 'twit.com',
  blog: 'blog.com',
  bio: 'i like fude',
};

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('User model', () => {
  it('can post() a new user', () => {
    return mockRequest.post('/signup')
      .send(user)
      .then(results => {
        let token = jwt.verify(results.text, process.env.SECRET);
        let id = token.id;
        let encodedToken = results.text;
        expect(token.id).toBeDefined();
        expect(token.capabilities).toBeDefined();
      });
  });
});
