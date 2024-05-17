const { save } = require("../services/shorten");

const handler = async (event) => {
  try {
    for (const record of event.Records) {
      
      console.log("reading message: ", record.body);

      const messageBody = JSON.parse(record.body)

      const saveData = await save(messageBody);

      if (saveData) {
        //Redis cache
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { handler };
