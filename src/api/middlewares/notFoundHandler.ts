import { Request, Response } from 'express'
import status from 'http-status'

const notFoundHandler = async (_: Request, res: Response) => {
	res.status(status.NOT_FOUND).json({ error: 'Route not found' })
}

export default notFoundHandler
