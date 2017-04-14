const Koa = require('koa');
const app = module.exports = new Koa();

const config = require('config');
const mongoose = require('./libs/mongoose');

const path = require('path');
const fs = require('fs');

const handlers = fs.readdirSync(path.join(__dirname, 'handlers')).sort();

handlers.forEach(handler => require('./handlers/' + handler).init(app));

// ---------------------------------------

// can be split into files too
const Router = require('koa-router');
const pick = require('lodash/pick');

const router = new Router({
  prefix: '/api'
});
const Split = require('./libs/split');

router
  .param('splitById', require('./routes/splitById').param)
  .get('/', require('./routes/root'))
  .get('/splits', require('./routes/splits').get)
  .post('/addSplit', require('./routes/addSplit').post)
  .patch('/:splitById', require('./routes/splitById').patch)
  .del('/:splitById', require('./routes/splitById').del);
  
app.use(router.routes());
