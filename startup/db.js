const config = require('config')
const winston = require('winston')
const mongoose = require('mongoose')

module.exports = function(){
    mongoose.connect(`${config.get('dbSettings.uri')}/${config.get('dbSettings.name')}`,{useCreateIndex: true,useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => winston.info(`Connected to db ${config.get('dbSettings.name')}`))
            .catch(()=>{
                winston.error('Cant connect to to db');
                process.exit(1);
            })
        }