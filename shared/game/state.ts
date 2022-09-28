import type Player from './player.js'

type GameState = ({ type: 'waiting-to-start' } | { type: 'voting' }) & {
	owner: string
	leader: string
	players: Record<string, Player>
}

export default GameState
