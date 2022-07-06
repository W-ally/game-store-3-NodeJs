
const dotenv = require('dotenv');

// Models
const { Games } = require('../models/games.model');
const { Console } = require('../models/consoles.model');
const { Review } = require('../models/reviews.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');



const getAllGames = catchAsync(async (req, res, next) => {
	
	const game = await Post.findAll({
		attributes: ['id', 'title', 'genre'],
		include: [
			{ model: Console, attributes: [ 'name', 'company'] },
			{
				model: Review,
				attributes: ['userId', 'gameId', 'comment'],
				include: {
					model: User,
					attributes: [ 'name'],
				},
				
			},
		],
	});


	res.status(200).json({
		status: 'success',
		game,
	});
});

const createGame = catchAsync(async (req, res, next) => {
	const { title, genre } = req.body;

	const game = await Games.create({
		title,
		genre,
	});
	res.status(201).json({
		status: 'success',
		game,
	});
});




const updateGame = catchAsync(async (req, res, next) => {
	const { game } = req;
	const { title } = req.body;
	


	await game.update({ title });

	res.status(204).json({ status: 'success' });
});

const deleteGame = catchAsync(async (req, res, next) => {
	const { game } = req;

	// await user.destroy();
	await game.update({ status: 'Disable' });

	res.status(204).json({ status: 'success' });
});

const reviewGame = catchAsync(async (req, res, next) => {
	const { comment } = req.body;

	const game = await Games.create({
		comment
	});
	res.status(201).json({
		status: 'success',
		game,
	});
});



module.exports = {
	getAllGames,
	createGame,
	updateGame,
	deleteGame,
	reviewGame
};
