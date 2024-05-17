const handler = async (event) => {
  for (const record of event.Records) {
    console.log("reading message: ", record.body);
  }
};

module.exports = { handler };
