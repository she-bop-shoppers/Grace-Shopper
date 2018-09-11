const Book = require('../db/models/book')
const router = require('express').Router()

router.get('/', async (req, res, next) => {
  const books = await Book.findAll()
  res.json(books)
})
module.exports = router
