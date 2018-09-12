const User = require('./user');
const Book = require('./book');
const Author = require('./author');
const Review = require('./review');
const Order = require('./order');
const OrderBook = require('./orderBook');
const Genre = require('./genre');

//associations
Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Book, { through: OrderBook });
Book.belongsToMany(Order, { through: OrderBook });

Review.belongsTo(User);
User.hasMany(Review);

Book.belongsTo(Author);
Author.hasMany(Book);

Book.belongsTo(Genre);
Genre.hasMany(Book);

module.exports = {
	User,
	Book,
	Author,
	Review,
	Order,
	OrderBook
};
