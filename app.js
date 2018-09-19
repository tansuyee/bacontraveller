const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({origin: true, credentials: true}));

require('./server/config/passport');
require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the BaconTraveller server!',
}));

module.exports = app;
