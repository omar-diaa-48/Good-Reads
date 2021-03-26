const config = require('config')
const Joi = require('joi')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName:{
        type:String,minLength:3,maxLength:15,required:true,unique:true
    },
    email:{
        type:String,minLength:5,maxLength:255,required:true,unique:true
    },
    password:{
        type:String,minLength:5,maxLength:1024,required:true
    },
    firstName:{
        type:String,minLength:3,maxLength:15,required:true
    },
    lastName:{
        type:String,minLength:3,maxLength:15
    },
    birthDate:{
        type:Date,required:true
    },
    isAdmin:{
      type:Boolean, default:false  
    },
    favoritedBooks:[
        {
            bookTitle:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Book'
            },
            rating:{
                type:Number,
                default:0
            }
        }
    ]
})
UserSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id:this._id, isAdmin:this.isAdmin}, config.get('jwtPrivateKey'))
}
const User = mongoose.model('User', UserSchema)

function validateUserRegister(user) {
    const schema = Joi.object({
        userName: Joi.string().min(3).max(15).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        firstName: Joi.string().min(3).max(15).required(),
        lastName: Joi.string().min(3).max(15),
        birthDate: Joi.date().required(),
    })

    return schema.validate(user)
}

function validateUserLogin(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    })
    return schema.validate(user)
}

module.exports = {User,validateUserRegister,validateUserLogin}


