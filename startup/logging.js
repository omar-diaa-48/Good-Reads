
const winston = require('winston')
const config = require('config')
require('winston-mongodb')
require('express-async-errors')

module.exports = function () {
    const logger = winston.createLogger({
        transports:new winston.transports.File({filename:'combined.log'}),
        exceptionHandlers: new winston.transports.File({filename:'exceptions.log'}),
    })

    process.on('unhandledRejection', (ex)=> {throw ex})
    
    winston.add(new winston.transports.File({filename: 'logfile.log'}))
}