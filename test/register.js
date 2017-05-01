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

let existingUserData = {
    email: 'lika.dimitrov@rambler.ru',
    name: 'Lika',
    password: '123456'

};

let newUserData = {
    email: "kira@dinas.net",
    name: "Kira",
    password: '123456'
};

let nonCompletedDataUser = {
  email: "kira@dinas.net",
  name: "Kira",
  password: ''
};

let userForLogInWithoutOneField = {
  email: '',
  password: '123456'
};

let nonExistingUser = {
  email: 'idont@exist.com',
  password: '424242'
}

let existingUser;

    // before(done => {
    //   server = app.listen(3000, done);
    // });
    //
    // after(done => {
    //   server.close(done);
    // });

describe('POST /register', async () => {
  beforeEach(async () => {
    await User.remove({});
  });
  afterEach(async () => {
    await User.remove({});
  });
  context('when data is valid', async () => {
    it('creates new user', async () => {
      const response = await request({
          method: 'post',
          uri: getURL('register'),
          json: true,
          body: newUserData
      });
      const user = await User.findOne({email: newUserData.email});
      assert.equal(response.body.success, true);
      assert.equal(user.email, newUserData.email);
      assert.equal(user.name, newUserData.name);
    });
  });
  context('when data is invalid', async () => {
    context('when password is empty', async () => {
      it('returns 400 and no user appears', async () => {
          let response = await request({
              method: 'post',
              uri: getURL('register'),
              json: true,
              body: nonCompletedDataUser
          });
          const user = await User.findOne({email: nonCompletedDataUser.email});
          assert.equal(response.statusCode, 400);
          assert.equal(user, null);
      });
    });
    context('when user exists', async () => {
      it('returns false in response and user is the same', async () => {
        const user = await User.create(existingUserData);
        const creationTime = user.createdAt;
        const response = await request({
            method: 'post',
            uri: getURL('register'),
            json: true,
            body: existingUserData
        });
        assert.equal(response.body.success, false);
        const userAfterAttempt = await User.findOne({email: existingUserData.email});
        assert.equal(+creationTime, +userAfterAttempt.createdAt);
      });
    });
  });
});
