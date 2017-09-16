const Koa = require('koa');
const render = require('koa-ejs');
const Router = require('koa-router');
const path = require('path');

const app = new Koa();
const router = new Router();

const userController = require('./controllers/users');

// koa-ejs
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'index',
  viewExt: 'ejs',
  cache: true,
  debug: false,
});

// routes
router.get('/', async ctx => userController.getUserList(ctx));

// router.get('/', ctx => ctx.render('partials/userlist', {
//   users: User.getUserList,
// }),
// );
// router.get('/about',  (ctx, next) => {
//   ctx.render('partials/about');
// });

app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(3002);
console.log('3002 port is magic!');
module.exports = app;
