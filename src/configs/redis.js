const redis = require('redis');

const redisClient = redis.createClient({
    url: 'redis://' + process.env.REDIS_HOST + ':' + process.env.REDIS_PORT
});

redisClient.on("error", (error) =>
    console.log(`Redis connect error => ${error.message}`),
);
(async () => {
    await redisClient.connect();
})();

module.exports = { redisClient };
