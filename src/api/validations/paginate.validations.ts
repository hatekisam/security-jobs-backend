import Joi from 'joi'
export default {
	query: Joi.object({
		search: Joi.string().optional(),
		limit: Joi.number().positive().optional(),
		filter: Joi.string()
			.regex(/^[^:]+:[^:]+$/)
			.optional(),
		page: Joi.number().min(1).optional(),
		sort: Joi.string().optional(),
	}),
}
