import Joi from 'joi'

export default {
	createCourse: Joi.object({
		name: Joi.string().required(),
		description: Joi.string().required(),
		topics: Joi.array().items(Joi.string())
	}),
}
