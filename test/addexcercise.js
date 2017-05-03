const request = require('request-promise').defaults({
    resolveWithFullResponse: true,
    simple: false
});
const config = require('config');
const assert = require('assert');

let server;

const User = require('../models/user');
const Split = require('../models/split');
const Excercise = require('../models/excercise');

function getURL(path) {
    return `http://localhost:3000/api/${path}`;
};

const excercise = {
  title: 'My excercise',
  text: 'Super excercise'
}

const newUser = {
    email: "kira@dinas.net",
    name: "Kira",
    password: '123456'
};

const existingUser = {
  email: 'kira@dinas.net',
  password: '123456'
}

const createUser = async (user) => {
  await User.create(user);
};

const logIn = async (user) => {
  const loggedUser = await request({
      method: 'post',
      uri: getURL('logIn'),
      json: true,
      body: existingUser
  });
  return loggedUser.body.token;
};

describe('POST /addExcercise', async () => {
  beforeEach(async () => {
    await Excercise.remove({});
    await User.remove({});
    await createUser(newUser);
  });
  afterEach(async () => {
    await Excercise.remove({});
    await User.remove({});
  });
  context('when user has no token', async () => {
    it('returns 401 and no excercise appears', async () => {
      const response = await request({
          method: 'post',
          uri: getURL('addExcercise'),
          json: true,
          body: excercise
      });
      const excerciseInDB = await Excercise.findOne({title: excercise.title});
      assert.equal(response.statusCode, 401);
      assert.equal(excerciseInDB, null);
    });
  });
  context('when user has token', async () => {
    let token = null;
    beforeEach(async () => {
      token = await logIn(existingUser);
    });
    afterEach(() => {
      token = null;
    })
    context('when excercise is valid', async () => {
      it('adds excercise to db', async () => {
        const response = await request({
            method: 'post',
            uri: getURL('addExcercise'),
            json: true,
            headers: {
              'token': token
            },
            body: excercise
        });
        const excerciseInDB = await Excercise.findOne({title: excercise.title});
        assert.equal(response.body.success, true);
        assert.equal(excerciseInDB.title, excercise.title);
        assert.equal(excerciseInDB.text, excercise.text);
      });
    });
    context('when excercise already exists', async () => {
      it('returns error and no excercise changes', async () => {
        const createdExcercise = await Excercise.create(excercise);
        const createdAt = createdExcercise.createdAt;
        const response = await request({
            method: 'post',
            uri: getURL('addExcercise'),
            json: true,
            headers: {
              'token': token
            },
            body: excercise
        });
        const newExcercise = await Excercise.findOne({title: excercise.title});
        const newCreatedAt = newExcercise.createdAt;
        assert.equal(response.body.success, false);
        assert.equal(response.body.error, 'Excercise already exists');
        assert.equal(+createdAt, +newCreatedAt);
      });
    });
    context('when excercise contins one field empty', async () => {
      it('returns 402 and no excercise appears', async () => {
        const excerciseWithOneFieldEmpty = {
          title: 'good excercise'
        };
        const response = await request({
            method: 'post',
            uri: getURL('addExcercise'),
            json: true,
            headers: {
              'token': token
            },
            body: excerciseWithOneFieldEmpty
        });
        const excercise = await Excercise.findOne({title: excerciseWithOneFieldEmpty.title});
        assert.equal(response.statusCode, 402);
        assert.equal(excercise, null);
      });
    });
  });
});
