
const router = require('express').Router()
const {User,validateUserRegister} = require('../models/user')
const {Book, validateBook} = require('../models/book');
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth');

//me
router.get('/myBooks', auth, async(req,res)=>{
    const user = await User.findOne({_id:req.user._id})
                            //.populate('favoritedBooks')
                            

    res.send(user.favoritedBooks)
})

//addBookToFavorites
router.post('/fav/:id', auth, async(req,res)=>{
    const user = await User.findById(req.user._id);
    const book = await Book.findById(req.params.id);
    if(!book) return res.status(404).send('Book not found');
    user.favoritedBooks.push(req.params.id);
    await user.save();
    res.send(book)
})

//register
router.post('/', async(req,res)=>{
    const {error} = validateUserRegister(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('Email already used');

    user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    res.send(user);
})

module.exports = router