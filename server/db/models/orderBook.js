const Sequelize = require('sequelize');
const db = require('../db');

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
		validate: { min: 0 }
	}
});
module.exports = OrderBook;
