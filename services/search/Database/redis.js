const Redis = require('ioredis');
const redis = new Redis();
const db = require('./index.js');

// redis.connect((err, res) => {
//   if (err) {
//     console.log('connection error:', err);
//   } else {
//     console.log('connection sucess', res);
//   }
// });


const set = (key, value) => {
  redis.set(key, value)
    .then(res => console.log('value set'))
    .catch(err => console.log('error from redis set', err));
};

const get = (url, query, page) => {
  return redis.get(url)
    .then(res => {
      if (res) {
        return JSON.parse(res);
      } else {
        return db.query(query, page)
          .then(result => {
            set(url, JSON.stringify(result));
            return result;
          }).catch(err => console.log('error from db query', err));
      }
    }).catch(err => console.log('error from get', err));
};

module.exports = {
  set: set,
  get: get,
};