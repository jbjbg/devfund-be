'use strict';

process.env.STORAGE = 'mongo';
const jwt = require('jsonwebtoken');
const server = require('../../src/app').server;
const supergoose = require('../supergoose.js');
const mockRequest = supergoose.server(server);
// const mockRequest = require('supertest');


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

let login = {
  username: 'paul',
  password: 'password'
};

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('Auth router', () => {
  let encodedToken;
  let id;
  it('can post() a new user', () => {
    return mockRequest.post('/signup')
      .send(user)
      .then(results => {
        // console.log(results.headers.token);
        let token = jwt.verify(results.headers.token, process.env.SECRET||'foobar');
        id = token.id;
        encodedToken = results.headers.token;
        expect(token.id).toBeDefined();
      });
  });

  it('can signin with basicAuth', () => {
    return mockRequest.post('/signin')
      .auth(user.username, user.password)
      .then(results => {
        let token = jwt.verify(results.body.token, process.env.SECRET||'foobar');
        expect(token.id).toEqual(id);
      });
  });

  it('can get a user by id', () => {
    return mockRequest.get(`/user/${id}`)
      .auth(user.username, user.password)
      .then(results => {
        let username = results.body.username;
        let firstname = results.body.firstname;
        let lastname = results.body.lastname;
        expect(username).toEqual(user.username);
        expect(firstname).toEqual(user.firstname);
        expect(lastname).toEqual(user.lastname);
      });
  });

  it('can update by id', () => {
    return mockRequest.put(`/user/update/${id}`)
      .auth(user.username, user.password)
      .send({username: 'notpaul'})
      .then(data => {
        user.username = 'notpaul';
        return mockRequest.get(`/user/${id}`)
          .auth(user.username, user.password)
          .then(results => {
            console.log(results.body);
            return;
          });
      });
  });
});