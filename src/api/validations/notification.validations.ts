import Joi from 'joi'
import { Notification } from '../interfaces/Notification'
import idSchema from './id.validation'

export default {
	newNotification: Joi.object<Notification>({
		title: Joi.string().max(60).required(),
		summary: Joi.string().max(128).required(),
		body: Joi.string().max(512).required(),
		recipient: idSchema.required(),
		read: Joi.boolean().default(false),
	}),
	updateNotification: Joi.object<Notification>({
		title: Joi.string().max(60).optional(),
		summary: Joi.string().max(128).optional(),
		body: Joi.string().max(512).optional(),
		recipient: idSchema.optional(),
		read: Joi.boolean().optional(),
	}),
	userNotifications: Joi.object({
		recipientId: idSchema.required(),
	}),
	notifyAll: Joi.object({
		title: Joi.string().max(60).required(),
		summary: Joi.string().max(128).required(),
		body: Joi.string().max(512).required(),
		read: Joi.boolean().default(false),
	}),
}
