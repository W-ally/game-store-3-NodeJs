const { db, DataTypes } = require('../utils/database.util');

// Create our first model (table)
const Review = db.define('reviews', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	userId: {
		type: DataTypes.STRING,
		allowNull: false,
    
	},

	gameId: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	comment: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

module.exports = { Review };
