const router = require('express').Router()

const {Order, Book, OrderBook} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    if (req.query) {
      const orders = await Order.findAll({
        where: req.query
      })
      res.status(200).send(orders)
    } else {
      const orders = await Order.findAll({})
      res.status(200).send(orders)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const order = await Order.findById(id)
    res.status(200).send(order)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const cart = req.body
    let price = 0
    cart.forEach(item => {
      price += item.subTotal
    })
    const orders = await Order.create({
      totalPrice: price,
      date: Date.now(),
      cart,
      include: [{model: Book}, {model: OrderBook}]
    })
    res.status(200).send(orders)
  } catch (err) {
    next(err)
  }
})

module.exports = router
