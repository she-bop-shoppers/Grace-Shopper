const router = require('express').Router()

const {Book, Author, Genre} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    if (req.query) {
      const books = await Book.findAll({
        where: req.query,
        include: [{model: Author}, {model: Genre}]
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
    res.status(200).send(book)
  } catch (error) {
    next(error)
  }
})

const isAdmin = (req, res, next) => {
  console.log('i am in the isAdmin test for post books or delete books')
  console.log('req', req.req)
  console.log('req.user', req.user)
  //if () {
  const error = new Error('You are not authorized to complete this action')
  error.status = 401
  return next(error)
  // } else {
  //   next()
  // }
}

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const newBook = await Book.create(req.body)
    res.status(201).send(newBook)
  } catch (err) {
    console.error(err)
  }
})

router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const bookToDelete = await Book.findById(req.params.id)
    await bookToDelete.destroy()
    res.status(204).end()
  } catch (err) {
    console.error(err)
  }
})

module.exports = router
