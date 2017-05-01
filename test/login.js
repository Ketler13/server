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

describe('POST /login', async () => {
  context('when one field is empty', async () => {
    it('returns 400', async () => {
      const response = await request({
          method: 'post',
          uri: getURL('logIn'),
          json: true,
          body: userForLogInWithoutOneField
      });
      assert.equal(response.statusCode, 400);
    });
  });
  context('when user does not exist', async () => {
    it('returns success:false in response and does not return token', async () => {
      const response = await request({
          method: 'post',
          uri: getURL('logIn'),
          json: true,
          body: nonExistingUser
      });
      assert.equal(response.body.success, false);
      assert.equal(response.body.token, undefined);
    });
  });
  context('when user exists and data is correct', async () => {
    it('returns success: true and token', async () => {
      const user = await User.create(existingUserData);
      const response = await request({
          method: 'post',
          uri: getURL('logIn'),
          json: true,
          body: existingUserData
      });
      assert.equal(response.body.success, true);
      assert.equal(response.body.user.email, existingUserData.email);
      assert.equal(!!response.body.token, true);
    });
  });
});
