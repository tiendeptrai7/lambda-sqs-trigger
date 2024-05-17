const { SQS } = require("aws-sdk");

const offlineQueueUrl = "http://localhost:9324/000000000000/myqueue";

const options = {
  credentials: {
    accessKeyId: "doesnt_matter",
    secretAccessKey: "doesnt_matter",
  },
  endpoint: "http://localhost:9324",
};

const sqs = new SQS(options);

const handler = async (event) => {
  let statusCode = 200;
  let message;

  try {
    await sqs
      .sendMessage({
        QueueUrl: offlineQueueUrl,
        MessageBody: event.body || "",
        MessageAttributes: {
          AttributeName: {
            StringValue: "Attribute Value",
            DataType: "String",
          },
        },
      })
      .promise();

    message = "Successfully enqueued message!";
  } catch (error) {
    console.log(error);
    message = error;
    statusCode = 500;
  }

  return {
    statusCode,
    body: JSON.stringify({
      message,
    }),
  };
};

module.exports = { handler };
