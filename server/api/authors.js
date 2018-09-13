const router = require('express').Router()

const {Author} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    if (req.query) {
      const authors = await Author.findAll({
        where: req.query
      })
      res.status(200).send(authors)
    } else {
      const authors = await Author.findAll({})
      res.status(200).send(authors)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
