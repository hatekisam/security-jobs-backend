import { Notification, User } from '../models'
import { Server } from 'socket.io'

// use fast memory (redis) for storing connected users
const usersio: any = {}

export default function (io: Server) {
	io.on('connection', (socket: any) => {
		socket.on('setUserId', async (userId: string) => {
			if (userId) {
				const user = await User.findById(userId).lean().exec()
				if (user) {
					usersio[userId] = socket
					console.log(`⚡ Socket: User with id ${userId} connected`)
				} else {
					console.log(`🚩 Socket: No user with id ${userId}`)
				}
			}
		})

		socket.on('getNotificationsLength', async (userId: string) => {
			const notifications = await Notification.find({
				recipient: userId,
				read: false,
			}).lean()
			usersio[userId]?.emit('notificationsLength', notifications.length || 0)
		})

		socket.on('disconnect', (userId: string) => {
			console.log(`🔥 user with id ${userId} disconnected from socket`)
			usersio[userId] = null
		})
	})
}
