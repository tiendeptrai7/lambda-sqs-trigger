const { SQS } = require("aws-sdk");

const options = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  endpoint: process.env.QUEUSE_URL ,
};

const sqs = new SQS(options);

module.exports = { sqs };
 