import type { Socket } from 'socket.io'

export default interface Player {
	id: string
	name: string
	socket: Socket
}
