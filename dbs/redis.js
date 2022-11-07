// connection with redis using environment variables

const redis = require('redis');

const port = process.env.REDIS_PORT;
const host = process.env.REDIS_HOST;
const password = process.env.REDIS_PASSWORD;

const client = redis.createClient(port, host, {password});
if(password) client.auth(password)

client.on('error', (err) => console.log('Redis error', err));

module.exports = client