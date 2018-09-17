const router = require('express').Router()

const {OrderBook} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const orderBooks = await OrderBook.findAll()
    res.status(200).send(orderBooks)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  console.log('MADE IT INSIDE OF POST FUNC')
  try {
    console.log('BODY', req.body)
    //create order
    //OrderBook.
    const newOrderBook = await OrderBook.create(req.body)
    res.status(201).send(newOrderBook)
  } catch (err) {
    next(err)
  }
})

module.exports = router
