const { app } = require('./app');

// Models
const { User } = require('./models/users.model')
const { Game } = require('./models/games.model');
const { Console } = require('./models/consoles.model');
const { Review } = require('./models/reviews.model');

// Utils
const { db } = require('./utils/database.util');

db.authenticate()
	.then(() => console.log('Db authenticated'))
	.catch(err => console.log(err));

// Establish model's relations

/*// 1 GAME <----> M CONSOLE
Game.hasMany(Console, { foreignKey: 'id' });
Console.belongsTo(Game);*/

// 1 USER <----> M GAME 
User.hasMany(Game, { foreignKey: 'id' });
Game.belongsTo(User);
// 1 GAME <----> M REVIEWS
Game.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(Game);

//M-M gameinConsoles
Game.belongsToMany(Console, { foreignKey: 'id', through: 'gamesinConsoles' });
Console.belongsToMany(Game, { foreignKey: 'id', through: 'gamesinConsoles' });


db.sync()
	.then(() => console.log('Db synced'))
	.catch(err => console.log(err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Game Store running on port: ${PORT}`);
});


