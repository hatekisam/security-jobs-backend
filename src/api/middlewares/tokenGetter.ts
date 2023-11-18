import { NextFunction, Request, Response } from 'express'

export interface ITokenRequest extends Request {
	token?: string
}

export default function tokenGetter(
	req: ITokenRequest,
	_: Response,
	next: NextFunction
) {
	const authHeader = req.headers.authorization

	if (authHeader && authHeader.startsWith('Bearer ')) {
		console.log("It starts with it")
		req.token = authHeader.slice(7)
		console.log(authHeader.slice(7))
	}
	next()
}
