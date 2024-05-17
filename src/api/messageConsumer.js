const { save } = require("../services/shorten");

const { redisClient } = require("../configs/redis");

const handler = async (event) => {
  try {
    for (const record of event.Records) {
      console.log("reading message: ", record.body);

      const messageBody = JSON.parse(record.body);

      // SAVE DATABASE
      const saveData = await save(messageBody);

      // SAVE REDIS CACHE
      if (saveData) {
        redisClient.set(saveData.hash, saveData.shortUrl, {
          EX: 60 * 60 * 24,
        });
      }

      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { handler };
