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
  .param('splitById', require('./routes/splitbyid').param)
  .param('excerciseById', require('./routes/excercises').param)
  .get('/', require('./routes/root'))
  .post('/splits', require('./routes/splits').post)
  .post('/addSplit', require('./routes/addsplit').post)
  .patch('/splits/:splitById', require('./routes/splitbyid').patch)
  .del('/splits/:splitById', require('./routes/splitbyid').del)
  .get('/checkExcerciseTitle', require('./routes/checkexcercisetitle').get)
  .post('/addExcercise', require('./routes/addexcercise').post)
  .get('/excercises', require('./routes/excercises').get)
  .del('/excercises/:excerciseById', require('./routes/excercises').del)
  .post('/checkEmail', require('./routes/checkemail').post)
  .post('/checkName', require('./routes/checkname').post)
  .post('/register', require('./routes/register').post)
  .post('/logIn', require('./routes/login').post)
  .post('/logOut', require('./routes/logout').post);

app.use(router.routes());
