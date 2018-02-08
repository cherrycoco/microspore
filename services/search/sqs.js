const AWS = require('aws-sdk');
AWS.config.loadFromPath('../../config.json');
AWS.config.update({region: 'us-west-1'});

var sqs = new AWS.SQS();

const sendToSQS = (body) => {
  var params = {
    DelaySeconds: 0,
    MessageBody: body,
    QueueUrl: 'https://sqs.us-west-1.amazonaws.com/918161543286/search'
  };
   
  sqs.sendMessage(params, function(err, data) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data.MessageId);
    }
  });
};


const getFromSQS = (cb) => {
  var params = {
    QueueUrl: 'https://sqs.us-west-1.amazonaws.com/918161543286/search',
    MaxNumberOfMessages: 1,
    ReceiveRequestAttemptId: 'STRING_VALUE',
    VisibilityTimeout: 0,
    WaitTimeSeconds: 0
  };

  sqs.receiveMessage(params, function(err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
      cb(err, null);
    } else {
      console.log(data); // successful response
      cb(null, data);
    }    
  });
};

const deleteFromSQS = (receiptHandle) => {
  var params = {
    QueueUrl: 'https://sqs.us-west-1.amazonaws.com/918161543286/search',
    ReceiptHandle: receiptHandle 
  };
  sqs.deleteMessage(params, function(err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    } else {
      console.log(data);// successful response
    }     
  });
};



module.exports = {
  sendToSQS: sendToSQS,
  getFromSQS: getFromSQS,
  deleteFromSQS: deleteFromSQS
};