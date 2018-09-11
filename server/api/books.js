const router = require('express').Router()
const {Book, Author} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    if (req.query) {
      const books = await Book.findAll({
        where: req.query,
        include: [{model: Author}]
      })
      res.status(200).send(books)
    } else {
      const books = await Book.findAll({
        include: [{model: Author}]
      })
      res.status(200).send(books)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const book = await Book.findById(id, {
      include: [
        {
          model: Author
        }
      ]
    })
    res.send(book)
  } catch (error) {
    next(error)
  }
})

module.exports = router
