const { save } = require("../src/services/shorten");

const handler = async (event) => {
  try {
    for (const record of event.Records) {
      console.log("reading message: ", record.body);

      const messageBody = JSON.parse(record.body)

      const { url, code, shortUrl, hash } = messageBody;

      const saveData = await save(url, code, shortUrl, hash);

      if (saveData) {
        //Redis cache
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { handler };
