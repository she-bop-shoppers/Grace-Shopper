const router = require('express').Router()
const {Genre, Book} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const genres = await Genre.findAll({})
    res.status(200).send(genres)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const genre = await Genre.findById(id, {
      include: [
        {
          model: Book
        }
      ]
    })
    res.status(200).send(genre)
  } catch (error) {
    next(error)
  }
})

module.exports = router
