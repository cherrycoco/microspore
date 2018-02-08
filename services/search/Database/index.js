const elasticsearch = require('elasticsearch');
const fs = require('fs');

const client = new elasticsearch.Client({
  host: 'https://search-search-woq4vbblgpi3wldq3ta7lmqnju.us-west-1.es.amazonaws.com',
  // log: 'trace'
});

// ping the client to make sure successfully connected to elastic search db
// client.ping({
//   requestTimeout: 30000,
// }, function (error) {
//   if (error) {
//     console.error('elasticsearch cluster is down!');
//   } else {
//     console.log('All is well');
//   }
// });

// console.log count 
// client.count().then(res => console.log(res));

//bulk insert from ten-million-docs.txt
const bulkInsert = async () => {
  let data = await JSON.parse(fs.readFileSync('./ten-million-docs.json', 'utf8'));
  client.bulk({ 
    body: data
  }, (err, res) => {
    if (err) {
      console.log('error from bulk insert', err);
    } else {
      console.log('finished inserting:', res);
    }
  })
}

// bulkInsert();

//query for the searched items

const query = (q, page) => {
  return client.search({
    index: 'products',
    type: 'product',
    q: q,
    size: 20,
    from: 20 * page
  }).then((body) => {
    var hits = body.hits.hits;
    return hits;
  }, (error) => {
    console.trace('error from query', error.message);
  });
};

//index new item to the database
let indexProduct = (id, body) => {
  return client.index({
    index: 'products',
    type: 'product',
    id: id,
    body: body
  }).then(res => {
    return res;
  }, error => {
    console.trace('error from indexing', error.message);
  });
}

//delete a product from the database
let deleteProduct = (id) => {
  return client.delete({
    index: 'products',
    type: 'product',
    id: id
  }).then(res => {
    return res;
  }, error => {
    console.trace('error from indexing', error.message);
    return error;
  });
}

module.exports = {
  query: query,
  indexProduct: indexProduct,
  deleteProduct: deleteProduct
}
