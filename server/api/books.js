const router = require('express').Router()

const {Book} = require('../db/models')

router.get('/:genre', async (req, res, next) => {
  try {
    const booksByGenre = await Book.findByGenre(req.params.genre)
    res.json(booksByGenre)
  } catch (err) {
    next(err)
  }
})

router.get('/:title', async (req, res, next) => {
  try {
    const booksByTitle = await Book.findAll({
      where: {
        title: req.params.title
      }
    })
    res.status(200).send(booksByTitle)
  } catch (err) {
    next(err)
  }
})
module.exports = router
