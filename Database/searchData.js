const fs = require('fs');
const axios = require('axios');
const faker = require('faker');

// convert englishWords txt to an array of words
// const readEnglishWords = () => {
//   return new Promise ((resolve, reject) => {
//     fs.readFile('./EnglishWords.txt', (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   }).then(response => {
//     response = response.toString().split('\n');
//     return response;
//   }).catch(err => {
//     console.log('error from readFile EnglishWords:', err);
//   });
// };

// Generate a random product name
// const productNameGenerator = (words) => {
//   let numOfWords = Math.random() * 8;
//   let title = [];
//   for (let i = 0; i < numOfWords; i++) {
//     let randomWordIdx = Math.floor(Math.random() * words.length);
//     title.push(words[randomWordIdx]);
//   }
//   return title.join(' ');
// };



// generate a random price
// const priceGenerator = () => {
//   let price = (Math.random() * 1000).toFixed(2);
//   return price;
// };

// Create a product for search 
// const productGenerator = (name) => {
//   let product = {
//     name: name,
//     price: priceGenerator()
//   };

//   return product;
// };

const productGenerator = async () => {

  let name = await faker.commerce.productName();
  let price = await faker.commerce.price();

  let product = {
    name: name,
    price: price
  };

  return product;
};

const dbInsert = async (startId, endId) => {
  for (let i = startId; i <= endId; i++) {
    let product = await productGenerator();
    axios.put(`http://localhost:9200/products/product/${i}`, product)
    .then(res => console.log('done'))
    .catch(err => console.log('error from dbInsert:', err));
  }
}

// dbInsert(0, 1000);
// dbInsert(1001, 5000);
// dbInsert(5001, 10000);
// dbInsert(10001, 20000);
// dbInsert(20001, 22000);
// dbInsert(22001, 23000);
// dbInsert(23001, 24000);
dbInsert(24001, 25000);

// readEnglishWords().then(res => {
//   for (let i = 0; i <= 1000; i++) {
//     let productName = productNameGenerator(res);
//     let product = productGenerator(productName);
//     axios.put(`http://localhost:9200/products/product/${i}`, product)
//       .then(res => console.log('done', res))
//       .catch(err => console.log('error from insert:', err));
//   }
// });


// mapping product type
// PUT products/_mapping/product
// {
//   "properties": {
//     "name": {"type": "text"},
//     "price": {"type": "float"}
//   }
// }

// curl -XPUT 'localhost:9200/twitter/tweet/1/_create?pretty' -H 'Content-Type: application/json' -d'
// {
//     "user" : "kimchy",
//     "post_date" : "2009-11-15T14:12:12",
//     "message" : "trying out Elasticsearch"
// }
// '


