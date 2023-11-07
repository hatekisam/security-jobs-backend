import logger from './logger'
import { Request, Response, NextFunction } from 'express'
import status from 'http-status'
import APIError from '../helpers/APIError'

const mongoServerErrorMessage = (error: any) => {
	if (error.code === 11000) {
		return `Duplicate keys - [${Object.keys(
			error.keyPattern
		)}]:[${Object.values(error.keyValue)}]`
	}
	return error.message
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const requestLogger = (
	error: any,
	_: Request,
	response: Response,
	next: NextFunction
): void | Response => {
	logger.error(error.message)
	if (error.name === 'CastError') {
		return response.status(status.BAD_REQUEST).send({ error: 'Malformed id' })
	}
	if (error.name === 'ValidationError') {
		return response.status(status.BAD_REQUEST).json({ error: error.message })
	}
	if (error.name === 'JsonWebTokenError') {
		return response.status(status.UNAUTHORIZED).json({ error: 'Invalid token' })
	}
	if (error.name === 'TokenExpiredError') {
		return response.status(status.UNAUTHORIZED).json({ error: 'Token expired' })
	}
	if (error.name === 'MongoServerError') {
		logger.info(JSON.stringify(error))
		return response
			.status(status.BAD_REQUEST)
			.json({ error: mongoServerErrorMessage(error) })
	}
	if (error instanceof APIError) {
		return response.status(error.statusCode).json({ error: error.message })
	}
	next(error)
}

export default requestLogger
