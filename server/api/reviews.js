const router = require('express').Router()
const {Review, Book, User} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: [
        {
          model: Book
        },
        {
          model: User
        }
      ]
    })
    res.status(200).send(reviews)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const review = await Review.findById(id, {
      include: [
        {
          model: Book
        },
        {
          model: User
        }
      ]
    })
    res.status(200).send(review)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body)
    res.status(201).send(newReview)
  } catch (error) {
    next(error)
  }
})

module.exports = router
