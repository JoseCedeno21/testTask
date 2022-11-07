const redisClient = require('./../dbs/redis');
redisClient.connect();

const EXPIRE_TIME = process.env.EXPIRE_TIME;
const IP_LIMIT_REQUESTS = process.env.IP_LIMIT_REQUESTS;
const TOKEN_LIMIT_REQUESTS = process.env.TOKEN_LIMIT_REQUESTS;

exports.rateLimit = async (req, res, next) => {
  
    try {
        // check if redis client exist
        if (!redisClient) {
            throw new Error('Redis client error');
        }
        const clientIP = req.socket.remoteAddress;
        const clientToken = req.headers.token;

        // if request has token header (private) use token key, else use ip key (public)
        const redisKey = clientToken ? `ratelimit:token:${clientToken}` : `ratelimit:ip:${clientIP}`;
        
        // validate with type of limit we should use
        const limitRequest = clientToken? TOKEN_LIMIT_REQUESTS : IP_LIMIT_REQUESTS;

        // get the key result
        const keyResult = await redisClient.get(redisKey);
            
        // if the key hasn't resutl, set the key with request quantity = 1 and expire time
        if (!keyResult) {
            await redisClient.set(redisKey, 1, {EX: Number(EXPIRE_TIME)});
            return next();
        }

        // if key data is found, compare the allowed request quantity
        if(Number(keyResult) > Number(limitRequest)){
            const remainingTime = await redisClient.ttl(redisKey);
            return res.status(412).json({ message: `Request limit reached, remaining time: ${remainingTime} seconds` });
        }

        // if the request quantity don't reache the limit, plus it one and keep expire time
        const newUsedCount = Number(keyResult) + 1;
        await redisClient.set(redisKey, newUsedCount, {KEEPTTL: true});

        return next()

    } catch (error) {
        console.log('rate limit error: ', error);
        return next(error);
    }
};