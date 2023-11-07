import Joi from 'joi'

export default {
	createContact: Joi.object({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().email().required(),
		message: Joi.string().required(),
	}),
}
