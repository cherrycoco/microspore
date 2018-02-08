require('newrelic');
const Koa = require('koa');
const router = require('./routes.js');
const koaBody = require('koa-bodyparser');


const app = new Koa();

app.use(koaBody());

app.use(router.routes());

app.use(router.allowedMethods());

app.on('error', err => {
  log.error('server error', err);
});

let server = app.listen(3000);

module.exports = server;