const router = require('express').Router()

const {Author, Book} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const authors = await Author.findAll({})
    res.status(200).send(authors)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const author = await Author.findById(id, {
      include: [
        {
          model: Book
        }
      ]
    })
    res.status(200).send(author)
  } catch (error) {
    next(error)
  }
})

module.exports = router
