
const router = require('express').Router()


router.get('/', async (req, res, next) => {
  const books = await Book.findAll()
  res.json(books)
})

const {Book} = require('../db/models')



router.get('/:id', async (req,res,next) => {
  try {
    const id = req.params.id;
    const book = await findById(id)
    res.send(book);
  } catch (error) {
    next(error);
  }
})


module.exports = router
