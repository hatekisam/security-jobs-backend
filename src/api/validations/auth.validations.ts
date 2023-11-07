import Joi from 'joi'

export default {
	forgotPassword: Joi.object<{ email: string }>({
		email: Joi.string().email().required(),
	}),
	newPassword: Joi.object<{ password: string; email: string; token: string }>({
		password: Joi.string().required(),
		email: Joi.string().email().required(),
		token: Joi.string().required(),
	}),
	verifyMail: Joi.object<{ email: string; token: string }>({
		email: Joi.string().email().required(),
		token: Joi.string().required(),
	}),
	sendVerifyMail: Joi.object<{ email: string }>({
		email: Joi.string().email().required(),
	}),
}
