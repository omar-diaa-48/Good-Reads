const config = require('config')
const winston = require('winston');
const express = require('express');

const app = express()

require('./startup/logging')();
require('./startup/db')();
require('./startup/routers')(app);
require('./startup/config');

app.listen(config.get('port'), 
    ()=>winston.info(`Listening on port ${config.get('port')}...`))


