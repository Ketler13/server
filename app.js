const Koa = require('koa');
const app = module.exports = new Koa();

const config = require('config');

const path = require('path');
const fs = require('fs');

app.keys = [config.secret];

const handlers = fs.readdirSync(path.join(__dirname, 'handlers')).sort();

handlers.forEach(handler => require('./handlers/' + handler).init(app));

const Router = require('koa-router');

const router = new Router({
  prefix: '/api'
});

router
  .param('splitById', require('./routes/splitById').param)
  .param('excerciseById', require('./routes/excercises').param)
  .get('/', require('./routes/root'))
  .post('/splits', require('./routes/splits').post)
  .post('/addSplit', require('./routes/addSplit').post)
  .patch('/splits/:splitById', require('./routes/splitById').patch)
  .del('/splits/:splitById', require('./routes/splitById').del)
  .get('/checkExcerciseTitle', require('./routes/checkExcerciseTitle').get)
  .post('/addExcercise', require('./routes/addExcercise').post)
  .get('/excercises', require('./routes/excercises').get)
  .del('/excercises/:excerciseById', require('./routes/excercises').del)
  .post('/checkEmail', require('./routes/checkEmail').post)
  .post('/checkName', require('./routes/checkName').post)
  .post('/register', require('./routes/register').post)
  .post('/logIn', require('./routes/logIn').post)
  .post('/logOut', require('./routes/logOut').post);

app.use(router.routes());
