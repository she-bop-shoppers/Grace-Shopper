const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/books', require('./books'))
router.use('/genres', require('./genres'))
router.use('/authors', require('./authors'))
router.use('/orders', require('./orders'))
router.use('/reviews', require('./reviews'))
router.use('/orderBooks', require('./orderBooks'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
