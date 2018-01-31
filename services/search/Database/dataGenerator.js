const fs = require('fs');
const axios = require('axios');
const faker = require('faker');
// const file = require('./ten-million-docs.json');

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
// dbInsert(24001, 25000);

// writestream to ten-million-docs.txt
const wstream = fs.createWriteStream('./ten-million-docs.json');

const generateData = async (startId, endId) => {
  await wstream.write('[');
  for (let i = startId; i <= endId; i++) {
    let product = await productGenerator();
    let doc = {index:  {
      '_index': 'products', 
      '_type': 'product', 
      '_id': i 
    }}

    await wstream.write(JSON.stringify(doc) + ',');

    if (i === endId) {
      await wstream.write(JSON.stringify(product));
    } else {
      await wstream.write(JSON.stringify(product) + ',');
    }
  }
  await wstream.write(']');
  wstream.end();
}


generateData(900000, 1000000);
