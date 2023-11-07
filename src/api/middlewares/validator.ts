import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'
import APIError from '../helpers/APIError'
import status from 'http-status'

const validator = {
	body: function <T>(schema: Joi.ObjectSchema<T>) {
		return function callback(req: Request, _: Response, next: NextFunction) {
			try {
				const { error } = schema.validate(req.body)
				if (error)
					throw new APIError(status.BAD_REQUEST, error.details[0].message)
				next()
			} catch (err) {
				next(err)
			}
		}
	},
	params: function (params: Record<string, Joi.Schema>) {
		return function callback(req: Request, _: Response, next: NextFunction) {
			try {
				const paramKeys = Object.keys(params)

				for (const paramKey of paramKeys) {
					const schema = params[paramKey]
					const paramValue = req.params[paramKey]

					const { error } = schema.validate(paramValue)

					if (error)
						throw new APIError(status.BAD_REQUEST, error.details[0].message)
				}

				next()
			} catch (err) {
				next(err)
			}
		}
	},
	query: function <T>(schema: Joi.ObjectSchema<T>) {
		return function callback(req: Request, _: Response, next: NextFunction) {
			try {
				const { error } = schema.validate(req.query)

				if (error)
					throw new APIError(status.BAD_REQUEST, error.details[0].message)

				next()
			} catch (err) {
				next(err)
			}
		}
	},
}

export default validator
