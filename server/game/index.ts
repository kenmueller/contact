import { nanoid } from 'nanoid'

import CODE_LENGTH from '../../shared/code/length.js'

export default class Game {
	private static readonly games: Record<string, Game> = {}

	readonly code: string = nanoid(CODE_LENGTH)

	constructor() {
		Game.games[this.code] = this
	}

	static readonly code = (code: string) =>
		Object.prototype.hasOwnProperty.call(Game.games, code)
			? Game.games[code]
			: null
}
