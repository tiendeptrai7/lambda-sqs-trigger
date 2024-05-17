const { generate, checkExist } = require("../services/shorten");
const { sqs } = require("../configs/sqs");

const handler = async (event) => {
  let statusCode = 200;
  let generateUrl = null;
  const key = event.headers["key-shorten"];
  const body = JSON.parse(event.body);
  const url = body?.originalUrl ?? "";

  try {
    const data = await checkExist(url);

    if (data === null) {
      generateUrl = await generate(key, url);

      await sqs
        .sendMessage({
          QueueUrl:
            process.env.QUEUSE_URL +
            "/" +
            process.env.REGION +
            "/" +
            process.env.QUEUSE_NAME,
          MessageBody: JSON.stringify(generateUrl) || "",
          MessageAttributes: {
            AttributeName: {
              StringValue: "Attribute Value",
              DataType: "String",
            },
          },
        })
        .promise();

      return {
        statusCode,
        body: JSON.stringify({
          url_code: generateUrl === null ? "" : generateUrl.code,
          short_url: generateUrl === null ? "" : generateUrl.shortUrl,
        }),
      };
    }

    return {
      statusCode,
      body: JSON.stringify({
        url_code: data.code,
        short_url: data.shortUrl,
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: error,
    };
  }
};

module.exports = { handler };
