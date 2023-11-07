import { NextFunction, Request, Response } from 'express'
import status from 'http-status'
import { dashboardService } from '../services'

const stats = async (_: Request, res: Response, next: NextFunction) => {
	try {
		const stats = await dashboardService.getStats()

		res.status(status.OK).json(stats)
	} catch (err) {
		next(err)
	}
}

export default {
	stats,
}
