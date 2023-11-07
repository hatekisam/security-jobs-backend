import express from 'express'
import validator from '../middlewares/validator'
import {
	paginateValidations,
	notificationValidations,
	idValidation,
} from '../validations'
import accessControl from '../middlewares/accessControl'
import { notificationController } from '../controllers'

const router = express.Router()

router.post(
	'/',
	validator.body(notificationValidations.newNotification),
	notificationController.createNotification
)

router.get(
	'/search',
	accessControl([ 'ADMIN']),
	validator.query(paginateValidations.query),
	notificationController.searchNotification
)

router.get(
	'/user/:id',
	accessControl('ALL'),
	validator.params({ id: idValidation }),
	notificationController.getNotificationsForUser
)

router.put(
	'/clear',
	accessControl('ALL'),
	validator.body(notificationValidations.userNotifications),
	notificationController.markAllNotificationsAsRead
)

router.put(
	'/clear/:id',
	accessControl('ALL'),
	validator.params({ id: idValidation }),
	notificationController.markNotificationAsRead
)

router.get(
	'/',
	accessControl(['ADMIN']),
	notificationController.getAllNotifications
)

router.post(
	'/all',
	accessControl(['ADMIN']),
	validator.body(notificationValidations.notifyAll),
	notificationController.notifyAll
)
router.delete(
	'/all',
	accessControl(['ADMIN']),
	validator.body(notificationValidations.userNotifications),
	notificationController.deleteAllNotifications
)

router.get(
	'/:id',
	accessControl(['ADMIN']),
	notificationController.getNotification
)

router.put(
	'/:id',
	accessControl(['ADMIN']),
	validator.body(notificationValidations.updateNotification),
	notificationController.updateNotification
)

router.delete(
	'/:id',
	accessControl('ALL'),
	notificationController.deleteNotification
)

export default router
