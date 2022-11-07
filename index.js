const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

const port = 8080

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(passport.initialize());

require('./routes/testRoutes')(app);

app.listen(port, (err) => {
    if(err) {
        console.log('Error listening port: ', err)
        return
    }
    console.log('Listening port ', port)
})