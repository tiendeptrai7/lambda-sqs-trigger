const { generate } = require('../services/shorten');
const { sqs } = require('../configs/sqs');

const handler = async (event) => {
  let statusCode = 200;
  let message;
  let generateUrl = null;
  const key = event.headers['key-shorten'];
  const body = JSON.parse(event.body);
  const url = body?.originalUrl ?? '';

  try {
    generateUrl = await generate(key, url)

    await sqs
      .sendMessage({
        QueueUrl: process.env.QUEUSE_URL + '/' + process.env.REGION + '/' + process.env.QUEUSE_NAME,
        MessageBody: JSON.stringify(generateUrl) || "",
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
      url_code: generateUrl === null ? '' : generateUrl.code,
      short_url: generateUrl === null ? '' : generateUrl.shortUrl,
  }),
  };
};

module.exports = { handler };
