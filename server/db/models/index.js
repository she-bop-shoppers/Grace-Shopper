const User = require('./user')
const Book = require('./book')
const Author = require('./author')
const Review = require('./review')
const Sale = require('./sale')
const OrderItem = require('./orderItem')

//associations
Book.belongsTo(Author)
Author.hasMany(Book)

Sale.belongsTo(User)
User.hasMany(Sale)

OrderItem.belongsTo(Sale)
Sale.hasMany(OrderItem)

OrderItem.belongsTo(Book)
Book.hasMany(OrderItem)

Review.belongsTo(User)
User.hasMany(Review)

module.exports = {
  User,
  Book,
  Author,
  Review,
  Sale,
  OrderItem
}
