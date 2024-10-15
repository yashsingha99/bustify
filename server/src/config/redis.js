const dotenv = require('dotenv');
const { createClient } = require('redis');

dotenv.config();

const redisClient = createClient({
  url: process.env.REDIS_URI,
  socket: {
    keepAlive: true,  
    reconnectStrategy: retries => Math.min(retries * 50, 500), 
  },
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));

// Connect to Redis once at startup
(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;
