const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongodb = require('mongodb');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
// A simple document insert example, not using safe mode to ensure document persistance on MongoDB

const MongoClient = mongodb.MongoClient;

const addUser = (db, reqBody, callback) => {
  const collection = db.collection('users');
  if (reqBody) {
    collection.insertOne({
      name: reqBody.name,
    }, (err, result) => {
      callback(result);
    });
  } else {
    throw new Error('no request body');
  }
};

// route
router
  .get('/', (ctx, next) => {
    ctx.body = 'login.page';
  })
  .post('/api/user', (ctx, next) => {
    MongoClient.connect('mongodb://localhost:27017/test2', (err, db) => {
      if (err) throw err;
      addUser(db, ctx.request.body, () => {
        db.close();
      });
    });
  });

app.use(router.routes());

// app.use(async ctx => {
//     ctx.set('Cache-Control', 'max-age=300')
//     ctx.set('Last-Modified', new Date())
//     ctx.type="text/html"
//     console.log({
//         url: ctx.request.url,
//         originalUrl: ctx.request.originalUrl,
//         origin: ctx.request.origin,
//         herf: ctx.request.href,
//         path: ctx.request.path,
//         query: ctx.request.query,
//         querystring: ctx.request.querystring,
//         host: ctx.request.host,
//         hostname: ctx.request.hostname,
//         fresh: ctx.request.fresh,
//         search: ctx.request.search,
//         // URL: ctx.request.URL,
//         type: ctx.request.type,
//         charset: ctx.request.charset,
//         secure: ctx.request.secure,
//         ip: ctx.request.ip,
//         ips: ctx.request.ips
//     })
//     // ctx.throw(401, "not login")
//     // ctx.assert(ctx, state,user, 401, 'not login')
//     ctx.body = "<h1>hello</h1>"
// })

app.listen(3000);
