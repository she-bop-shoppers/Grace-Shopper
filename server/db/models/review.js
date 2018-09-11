const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  date:{
    type:Sequelize.Date,
  },
  text:{
    type:Sequelize.TEXT,
  }
});
module.exports = Review
