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
  fullName: {
    type: Sequelize.VIRTUAL,
    get() {
      return (
        this.getDataValue('firstName') + ' ' + this.getDataValue('lastName')
      )
    }
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
