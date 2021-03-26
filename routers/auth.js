
const router = require('express').Router()
const {User, validateUserLogin} = require('../models/user')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const jwt = require('jsonwebtoken')

router.post('/', async (req,res)=>{
    const {error} = validateUserLogin(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password')

    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send(_.pick(user, ["userName", "firstName", "lastName", "birthDate"]));
})

module.exports = router