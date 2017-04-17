const Koa = require('koa');
const app = module.exports = new Koa();

const config = require('config');
const mongoose = require('./libs/mongoose');

const path = require('path');
const fs = require('fs');

const handlers = fs.readdirSync(path.join(__dirname, 'handlers')).sort();

handlers.forEach(handler => require('./handlers/' + handler).init(app));

const Router = require('koa-router');
const pick = require('lodash/pick');

const router = new Router({
  prefix: '/api'
});
const Split = require('./models/split');

router
  .param('splitById', require('./routes/splitById').param)
  .param('excerciseById', require('./routes/excercises').param)
  .get('/', require('./routes/root'))
  .get('/splits', require('./routes/splits').get)
  .post('/addSplit', require('./routes/addSplit').post)
  .patch('/splits/:splitById', require('./routes/splitById').patch)
  .del('/splits/:splitById', require('./routes/splitById').del)
  .get('/checkExcerciseTitle', require('./routes/checkExcerciseTitle').get)
  .post('/addExcercise', require('./routes/addExcercise').post)
  .get('/excercises', require('./routes/excercises').get)
  .del('/excercises/:excerciseById', require('./routes/excercises').del);

app.use(router.routes());
