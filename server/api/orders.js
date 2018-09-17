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
    console.log('USER', req.user.id)

    const cart = req.body
    const userId = req.user.id
    let price = 0
    cart.forEach(item => {
      price += item.subTotal
    })
    const orders = await Order.create({
      totalPrice: price,
      date: Date.now(),
      userId: userId,
      orderBook: cart,
      include: [{model: OrderBook}]
    })
    res.status(200).send(orders)
  } catch (err) {
    next(err)
  }
})

module.exports = router
