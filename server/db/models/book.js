const Sequelize = require('sequelize');
const db = require('../db');

const Book = db.define('book', {
	title: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	price: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: { min: 0 }
	},
	description: {
		type: Sequelize.TEXT
	},
	imageUrl: {
		type: Sequelize.STRING,
		defaultValue: 'https://images-na.ssl-images-amazon.com/images/I/51puATl2zfL._SL500_.jpg'
	}
});

Book.findByGenre = (genre) => {
	return Book.findAll({
		where: {
			genre
		}
	});
};

module.exports = Book;
