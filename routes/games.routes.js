const express = require('express');

// Controllers
const {
	getAllGames,
	createGame,
	updateGame,
	deleteGame,
	reviewGame
} = require('../controllers/games.controller');

// Middlewares
const {
	createGameValidators
} = require('../middlewares/validators.middleware');
const { userExists } = require('../middlewares/users.middleware');
const {
	protectSession,
	protectUserAccount,
} = require('../middlewares/auth.middleware');

const gameRouter = express.Router();


gameRouter.get('/', getAllGames);

gameRouter.use(protectSession);

gameRouter.post('/', createGameValidators, createGame);

gameRouter
	.use('/:id', userExists)
	.route('/:id')
    .patch(protectUserAccount, updateGame)
	.delete(protectUserAccount, deleteGame);
gameRouter
	.route('reviews/:gameId')
	.post(protectUserAccount,reviewGame)


module.exports = { gameRouter };
