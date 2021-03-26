
const express = require('express')
const userHandler = require('../routers/user')
const authHandler = require('../routers/auth')
const bookHandler = require('../routers/book');
const errorHandler = require('../middleware/error')

module.exports = function (app) {
    //req process
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))

    //route handlers
    app.use('/user', userHandler)
    app.use('/register', userHandler)
    app.use('/login', authHandler)
    app.use('/books', bookHandler)

    //home
    app.get('/', (req,res)=>{
        res.send('Hello User');
    })
    
    //error handler
    app.use(errorHandler)
}