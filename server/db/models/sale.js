const Sequelize = require('sequelize')
const db = require('../db')

const Sale = db.define('sale', {
  date:{
    type:Sequelize.Date,
  },
  totalPrice:{
    type:Sequelize.DECIMAL,
   allowNull:false,
   validate: { min: 0 },
  }
  // we need to add userId in seed file (optional), default value is GUEST
  // we took out status from this schema because we figured out we will not need it
});
module.exports = Sale
