
const router = require('express').Router()
const {Book, validateBook} = require('../models/book');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const winston = require('winston');

//get
router.get('/:id', async (req,res)=>{
    const books = await Book.findById(req.params.id)
                        
    if(!books)return res.status(400).send('Book not found')
    res.send(book)
})

router.get('/', async (req,res)=>{
    const books = await Book.find().sort('title');
    if(books.length == 0)return res.status(404).send('No books found')
    res.send(books)
})


//post
router.post('/', auth, async (req,res)=>{
    const {error} = validateBook(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    let book = await Book.findOne({title:req.body.title})
    if(book) return res.status(400).send('Book already exists');

    book = new Book(req.body)
    await book.save()
    res.send(book)
})


//delete
router.delete('/:id', [auth, admin], async (req,res)=>{
    const book = await Book.deleteOne({_id:req.params.id})
    if(!book) return res.status(500).send('Book couldnt be deleted')
    res.send(book)
})

module.exports = router