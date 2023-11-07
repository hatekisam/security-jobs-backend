import { Response, NextFunction } from 'express'
import { Role } from '../interfaces/Role'
import { Payload, verifyAuthToken } from '../helpers/authToken'
import APIError from '../helpers/APIError'
import status from 'http-status'
import { ITokenRequest } from './tokenGetter'

export interface IUserRequest extends ITokenRequest {
	user?: Payload
}
export default function accessControl(allowedRoles: Role[] | 'ALL') {
	return function callBack(req: IUserRequest, _: Response, next: NextFunction) {
		try {
			const token = req.token
			if (!token) throw new APIError(status.UNAUTHORIZED, `Invalid token`)

			const payload = verifyAuthToken(token) as Payload

			req.user = payload

			if (allowedRoles === 'ALL') return next()
			if (!allowedRoles.includes(payload.role))
				throw new APIError(status.UNAUTHORIZED, `Access denied`)

			next()
		} catch (err) {
			next(err)
		}
	}
}
