const { DataTypes } = require('sequelize');
const { sequelize } = require('../util/database');

// Models
const { Game } = require('./games.model');
const { Console } = require('./consoles.model');

const GamesinConsole = sequelize.define('gamesinConsole', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	gameId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		
	},
	consoleId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		
	},
});

module.exports = { GamesinConsole };
