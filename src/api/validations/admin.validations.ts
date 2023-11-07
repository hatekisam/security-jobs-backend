import Joi from 'joi'
import { AdminRoleEnum, NewAdmin } from '../interfaces/Admin'

export default {
	newAdmin: Joi.object<NewAdmin>({
		name: Joi.string().required(),
		email: Joi.string().required(),
		password: Joi.string().required(),
		phone: Joi.string().required(),
		role: Joi.string()
			.valid(...AdminRoleEnum)
			.required(),
	}),
	updateAdmin: Joi.object<Partial<NewAdmin>>({
		name: Joi.string().optional(),
		email: Joi.string().optional(),
		password: Joi.string().optional(),
		phone: Joi.string().optional(),
		role: Joi.string()
			.valid(...AdminRoleEnum)
			.required(),
	}),
	loginAdmin: Joi.object({
		email: Joi.string().required(),
		password: Joi.string().required(),
	}),
}
