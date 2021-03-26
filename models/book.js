
const mongoose = require('mongoose');
const Joi = require('joi');
const { string } = require('joi');

const BookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    rating:{
        avg:{
            type:Number,
            default:0
        },
        count:{
            type:Number,
            default:0
        }
    },
    genre:[{
        type:String,
        required:true
    }]
})
function validateBook (book) {
    const schema = Joi.object({
        title:Joi.string().required(),
        author:Joi.string().required(),
        ratingAvg:Joi.number().default(0),
        ratingCount:Joi.number().default(0),
        genre:Joi.array().required()
    })

    return schema.validate(book)
}
const Book = mongoose.model('Book', BookSchema)

module.exports = {Book, validateBook}