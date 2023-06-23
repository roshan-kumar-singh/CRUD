var express = require('express');
var Book = require('../models/book');
var router = express.Router();

//all book details
router.get('/', async function(req, res) {
    console.log('Getting all books');
    try {
      const books = await Book.find({});
      console.log(books);
      res.json(books);
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('An error occurred');
    }
  });
  
//one book details 
  router.get('/:id', async function(req, res) {
    console.log('Getting one book');
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        res.status(404).send('Book not found');
      } else {
        console.log(book);
        res.json(book);
      }
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('An error occurred');
    }
  });
  
//add book details
router.post('/', function(req, res) {
  var newBook = new Book();
  newBook.title = req.body.title;
  newBook.author = req.body.author;
  newBook.category = req.body.category;
  
  newBook.save()
    .then(function(book) {
      console.log(book);
      res.send(book);
    })
    .catch(function(err) {
      console.error('Error:', err);
      res.status(500).send('Error saving book');
    });
});

//update book details
router.put('/:id', async function(req, res) {
    try {
      const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        { $set: {
          title: req.body.title,
          author: req.body.author,
          category: req.body.category
        }},
        { new: true }
      );
      if (!updatedBook) {
        res.status(404).send('Book not found');
      } else {
        console.log(updatedBook);
        res.send(updatedBook);
      }
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Error updating book');
    }
  });
  


//deleting book
router.delete('/:id', async function(req, res) {
    try {
      const book = await Book.findByIdAndRemove(req.params.id);
      if (!book) {
        res.status(404).send('Book not found');
      } else {
        console.log(book);
        res.send(book);
      }
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Error deleting book');
    }
  });
  

module.exports = router;
