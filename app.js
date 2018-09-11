const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
require('./server/config/passport');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the CatchAll!',
}));

module.exports = app;