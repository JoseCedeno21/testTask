const passport = require('passport');
const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const secretToken = process.env.JWT_SECRET_TOKEN;

// jwt stratefy, get the token from header and validate if its correct
const JWTPassportStrategy = new JWTStrategy(
{
    passReqToCallback: true,
    jwtFromRequest: ExtractJWT.fromHeader('token'),
    secretOrKey: secretToken
},
async (req, payload, done) => {
    try {
        return done(null, {
            message: 'authenticated'  
        });

    } catch (error) {
        console.log('JWT ERROR', error);
        return done(new Error(error));
    }
})

passport.use('jwt', JWTPassportStrategy)

// function to authenticate the jwt
exports.JWTAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, result) => {
        if (err || !result) {
            return res.status(401).json({ message: 'Authetication error' });
        } 
        console.log('successfully authenticated');
        next();
    })(req, res, next);
}
