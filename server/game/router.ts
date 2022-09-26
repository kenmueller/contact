import { Router } from 'express'

import Game from './index.js'

const game = Router()

game.post('/games', (_req, res) => {
	res.send(new Game().code)
})

game.get('/games/:code/exists', (req, res) => {
	res.send(Boolean(Game.code(req.params.code)))
})

export default game
