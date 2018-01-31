const db = require('./Database/index.js');

module.exports = {
  search: {
    get: async (ctx) => {
      let page = Number(ctx.params.page);
      await db.query(ctx.query.query, page)
      .then(res => {
        ctx.body = res;
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