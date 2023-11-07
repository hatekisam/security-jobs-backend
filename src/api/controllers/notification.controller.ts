import { NextFunction, Request, Response } from 'express'
import status from 'http-status'
import APIError from '../helpers/APIError'
import paginate from '../helpers/paginate'
import { Notification } from '../models'
import notificationService from '../services/notification.service'
import { IUserRequest } from '../middlewares/accessControl'
// import { jobService } from '../services'

const getNotification = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const notification = await notificationService.getNotificationById(
			req.params.id
		)

		if (!notification)
			throw new APIError(status.NOT_FOUND, 'Notification not found')

		res.json(notification)
	} catch (err) {
		next(err)
	}
}

const getAllNotifications = async (_req: Request, res: Response) => {
	const notifications = await notificationService.getAllNotifications()

	res.json(notifications)
}

const createNotification = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { body: newNotification } = req
		const savedNotification = await notificationService.createNotification(
			newNotification
		)

		res.status(status.CREATED).json(savedNotification)
	} catch (err) {
		next(err)
	}
}

const updateNotification = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = req.params.id
		const updatedNotification = await notificationService.updateNotification(
			id,
			req.body
		)

		if (!updatedNotification)
			throw new APIError(status.NOT_FOUND, 'Notification does not exist')

		res.status(status.OK).json(updatedNotification)
	} catch (err) {
		next(err)
	}
}

const deleteNotification = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		await notificationService.deleteNotification(req.params.id)
		res.status(status.NO_CONTENT).end()
	} catch (err) {
		next(err)
	}
}

const deleteAllNotifications = async (
	req: IUserRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		if (req.user?.role === 'USER' && req.user?.id !== req.body.recipientId)
			throw new APIError(
				status.BAD_REQUEST,
				"You are not allowed to clear another USER's notifications"
			)

		await notificationService.deleteAllNotifications(req.body.recipientId)

		res.status(status.NO_CONTENT).end()
	} catch (err) {
		next(err)
	}
}

const searchNotification = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const response = await paginate(req, Notification)

		res.status(status.OK).json(response)
	} catch (err) {
		next(err)
	}
}

const markAllNotificationsAsRead = async (
	req: IUserRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		if (req.user?.role === 'USER' && req.user?.id !== req.body.recipientId)
			throw new APIError(
				status.BAD_REQUEST,
				"You are not allowed to clear another USER's notifications"
			)

		const response = await notificationService.markAllNotificationsAsRead(
			req.body.recipientId
		)

		res.status(status.OK).json(response)
	} catch (err) {
		next(err)
	}
}

const markNotificationAsRead = async (
	req: IUserRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const notification = await notificationService.getNotificationById(
			req.params.id
		)

		if (!notification)
			throw new APIError(status.NOT_FOUND, 'Notification not found')

		if (
			req.user?.role === 'USER' &&
			req.user?.id !== notification.recipient.toString()
		)
			throw new APIError(
				status.BAD_REQUEST,
				"You are not allowed to clear another USER's notifications"
			)

		const response = await notificationService.markNotificationAsRead(
			req.params.id
		)

		res.status(status.OK).json(response)
	} catch (err) {
		next(err)
	}
}

const notifyAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { body } = req

		const response = await notificationService.notifyAll(body)

		res.status(status.CREATED).json(response)
	} catch (err) {
		next(err)
	}
}
const getNotificationsForUser = async (
	req: IUserRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		if (!req.user)
			throw new APIError(
				status.UNAUTHORIZED,
				'You need to be authenticated first'
			)

		if (req.user.role === 'USER' && req.user.id !== req.params.id) {
			throw new APIError(
				status.UNAUTHORIZED,
				"You are not allowed to get another USER's notifications"
			)
		}

		const id =
			req.user.role === 'USER' ? req.user.id : (req.params.id as string)

		const notificationsForUser =
			await notificationService.getNotificationsForUser(id)

		res.status(status.OK).json(notificationsForUser)
	} catch (err) {
		next(err)
	}
}

export default {
	getNotification,
	getAllNotifications,
	markAllNotificationsAsRead,
	markNotificationAsRead,
	createNotification,
	updateNotification,
	deleteNotification,
	deleteAllNotifications,
	searchNotification,
	notifyAll,
	getNotificationsForUser,
}
