const sqs = require('./sqs.js');
const db = require('./Database/index.js');
const redis = require('./Database/redis.js');

const addMessage = (body) => {
  sqs.sendToSQS(body);
};

// addMessage('/4?query=soft%20shirt%20handmade');

const getMessage = () => {
  sqs.getFromSQS((err, data) => {
    if (data.Messages) {
      let message = data.Messages[0];
      let url = message.Body;
      let body = url.split('?query=');
      console.log(body[0]);
      let page = parseInt(body[0][1]);
      console.log(page);
      let query = body[1].split('%20').join(' ');
      console.log(query);
      db.query(query, page)
        .then(result => {
          redis.set(url, JSON.stringify(result));
          return result;
        });
      console.log('here', message.ReceiptHandle);
      sqs.deleteFromSQS(message.ReceiptHandle);
    }
  });
};

module.exports = {
  addMessage: addMessage,
  getMessage: getMessage
}
