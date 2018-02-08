const db = require('./Database/index.js');
const redis = require('./Database/redis.js');
const Router = require('koa-router');
// const worker = require('./background-worker.js');

module.exports = {
  search: {
    get: async (ctx) => {
      let page = Number(ctx.params.page);
      let query = ctx.query.query.split(' ').join('%20');
      let url = `/${page}?query=${query}`
      await redis.get(url, ctx.query.query, page)
      .then(res => {
        console.log(res);
        ctx.body = res;
        // worker.addMessage(url);
      }).catch (err => {
        console.log('error from search get', err);
      });
    },

    post: async (ctx) => {
      let productId = ctx.params.productId;
      let body = ctx.request.body;
      await db.indexProduct(productId, body)
      .then(res => {
        ctx.body = res;
      });
    },

    delete: async (ctx) => {
      let productId = ctx.params.productId;
      await db.deleteProduct(productId)
      .then(res => {
        ctx.body = res;
      });
    }
  }
}