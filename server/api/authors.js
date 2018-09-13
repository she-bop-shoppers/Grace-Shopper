const router = require('express').Router()

const {Author} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const authors = await Author.findAll({})
    res.status(200).send(authors)
  } catch (err) {
    next(err)
  }
})

module.exports = router
