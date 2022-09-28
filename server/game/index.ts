import type { Socket } from 'socket.io'
import { nanoid } from 'nanoid'

import type Player from './player.js'
import type GameState from '../../shared/game/state.js'
import CODE_LENGTH from '../../shared/code/length.js'

export default class Game {
	private static readonly games: Record<string, Game> = {}

	readonly code: string = nanoid(CODE_LENGTH)

	/** The player who created the game. Starts all rounds. */
	private owner: string | null = null

	/** The player who came up with the word. */
	private leader: string | null = null

	private readonly players: Record<string, Player> = {}

	constructor() {
		Game.games[this.code] = this
	}

	static readonly code = (code: string) =>
		code in Game.games ? Game.games[code] : null

	readonly join = (name: string, socket: Socket) => {
		const player: Player = { id: nanoid(), name, socket }
		this.players[player.id] = player

		this.owner ??= player.id
		this.leader ??= player.id

		this.update()

		return player.id
	}

	readonly leave = (id: string) => {
		if (!(id in this.players)) return

		delete this.players[id]
		this.update()
	}

	readonly update = () => {
		const { owner, leader, players } = this
		if (!(owner && leader)) return

		const state: GameState = {
			type: 'waiting-to-start',
			owner,
			leader,
			players: Object.fromEntries(
				Object.values(players).map(({ id, name }) => [id, { id, name }])
			)
		}

		for (const player of Object.values(this.players))
			player.socket.emit('state', state)
	}
}
