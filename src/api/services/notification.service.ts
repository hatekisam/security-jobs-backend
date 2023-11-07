import { Notification as NotificationType } from '../interfaces/Notification'
import { Notification, User } from '../models'

const createNotification = async (body: NotificationType) => {
	return Notification.create(body)
}

const getPrevNotification = async ({
	recipient,
	type,
}: {
	actor: string
	recipient: string
	type: string
}) => {
	return Notification.findOne({ recipient, type })
}

const markNotificationAsRead = async (id: string) => {
	return Notification.findByIdAndUpdate(
		id,
		{ $set: { read: true } },
		{ new: true }
	)
}

const markAllNotificationsAsRead = async (userid: string) => {
	await Notification.updateMany({ recipient: userid }, { $set: { read: true } })
}

const getNotificationById = async (id: string) => {
	return Notification.findById(id)
}

const getAllNotifications = async () => {
	return Notification.find({})
}

const getNotificationsForUser = async (id: string) => {
	return Notification.find({ recipient: id })
}

const updateNotification = async (id: string, body: NotificationType) => {
	return Notification.findByIdAndUpdate(id, body, { new: true })
}

const deleteNotification = async (notificationId: string) => {
	return Notification.findByIdAndDelete(notificationId).exec()
}

const deleteAllNotifications = async (userId: string) => {
	return Notification.deleteMany({ recipient: userId }, { new: true })
}

const notifyAll = async (body: Record<string, any>) => {
	const users = await User.find({})
	const newNotifications = users.map((user) => ({
		...body,
		recipient: user.id,
	}))
	return Notification.insertMany(newNotifications)
}

export default {
	getNotificationById,
	getNotificationsForUser,
	getAllNotifications,
	getPrevNotification,
	createNotification,
	markNotificationAsRead,
	markAllNotificationsAsRead,
	updateNotification,
	deleteNotification,
	deleteAllNotifications,
	notifyAll,
}
