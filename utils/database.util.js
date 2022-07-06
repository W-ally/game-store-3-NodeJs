const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize({
	dialect: 'postgres',
	host:  process.env.DB_HOST,
	username:  process.env.DB_USER,
	password:  process.env.DB_PASSW,
	port:  process.env.DB_PORT,
	database:process.env.DB,
	logging: false,
});

module.exports = { db, DataTypes };
