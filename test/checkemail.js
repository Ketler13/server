const request = require('request-promise').defaults({
    resolveWithFullResponse: true,
    simple: false
});
const config = require('config');
const assert = require('assert');
const User = require('../models/user');
function getURL(path) {
    return `http://localhost:3000/api/${path}`;
};

const newUser = {
    email: "kira@dinas.net",
    name: "Kira",
    password: '123456'
};

describe('POST /checkEmail', async () => {
  before(async () => {
    await User.create(newUser);
  });
  after(async () => {
    await User.remove({});
  });
  context('when email is empty', async () => {
    it('returns 400', async () => {
      const response = await request({
          method: 'post',
          uri: getURL('checkEmail'),
          json: true,
          body: null
      });
      assert.equal(response.statusCode, 400);
    });
  });
  context('when no email exists', async () => {
    it('validates it', async () => {
      const response = await request({
          method: 'post',
          uri: getURL('checkEmail'),
          json: true,
          body: {
            email: newUser.email
          }
      });
      assert.equal(response.body.success, true);
    });
  });
  context('when email exists', async () => {
    it.only('returns error', async () => {
      const response = await request({
          method: 'post',
          uri: getURL('checkEmail'),
          json: true,
          body: {
            email: newUser.email
          }
      });
      assert.equal(response.body.success, false);
      assert.equal(response.body.error, 'Email занят');
    });
  });
});
