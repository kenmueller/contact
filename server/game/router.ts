import { Router } from 'express'

import { io } from '../root.js'
import Game from './index.js'

const game = Router()

game.post('/games', (_req, res) => {
	res.send(new Game().code)
})

io.on('connection', socket => {
	try {
		const { code, name } = socket.handshake.query

		if (!(typeof code === 'string' && code && typeof name === 'string' && name))
			throw new Error('Must have a code and name')

		const game = Game.code(code)
		if (!game) throw new Error('Invalid code')

		const id = game.join(name, socket)

		socket.on('disconnect', () => {
			game.leave(id)
		})
	} catch {
		socket.disconnect()
	}
})

game.get('/games/:code/exists', (req, res) => {
	res.send(Boolean(Game.code(req.params.code)))
})

export default game
