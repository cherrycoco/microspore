const Router = require('koa-router');
const controller = require('./controller.js');

const router = new Router();

//Connect controller methods to their corresponding routes

//search query from the client including which page of the result they want
router.get('/search/:page', controller.search.get);

//post request from products service to add a new product into the search database
router.post('/search/:productId', controller.search.post);

//delete request from products service to delete an existing product from the search database
router.del('/search/:productId', controller.search.delete);

module.exports = router;