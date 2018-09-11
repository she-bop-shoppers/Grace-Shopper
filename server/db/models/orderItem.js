const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  quantity:{
    type:Sequelize.INTEGER,
    validate:{
      min:1
    }
  },
  price:{
    type:Sequelize.DECIMAL,
    allowNull:false,
    validate: { min: 0 },
  },

  // add bookId in seed file for this model
  // add saleId in seed file for this model
  // image & title from bookId

});
module.exports = OrderItem
