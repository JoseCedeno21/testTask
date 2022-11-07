const jwt = require('../middlewares/jwt');
const { rateLimit } = require('../middlewares/ratelimit');
const TestController = require('../controllers/testControllers');

module.exports = (app) => {
    // public endpoint just with ratelimit by ip
    app.get('/test/public', rateLimit, TestController.testPublicFunction);
    // private endpoint wiht jwt auth and ratelimit by token
    app.get('/test/private', jwt.JWTAuth, rateLimit, TestController.testPrivateFunction);
}