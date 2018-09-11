const Sequelize = require('sequelize')
const db = require('../db')

const Author = db.define('author', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  bio: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'http://www.harrypotterrealm.com/images/author/jkrowling05.jpg'
  }
})
module.exports = Author
//
