const Sequelize = require('sequelize')
const db = require('../db')
const {Book} = require('./book')

const OrderBook = db.define('orderBook', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {min: 0}
  }
})
module.exports = OrderBook

OrderBook.prototype.soldOutOrNot = async function() {
  try {
    const book = await Book.findById(this.bookId)
    if (book.quantity === 0) {
      return 'Sold out!'
    } else {
      book.quantity = book.quantity - this.quantity
    }
  } catch (error) {
    console.log(error)
  }
}
