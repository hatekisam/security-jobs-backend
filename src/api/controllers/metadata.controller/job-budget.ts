// import { NextFunction, Request, Response } from 'express'
// import { JobBudget } from '../../models'
// import status from 'http-status'

// export default {
// 	getAll: async function (_: Request, res: Response, next: NextFunction) {
// 		try {
// 			const jobBudgets = await JobBudget.find({})
// 			res.status(status.OK).json(jobBudgets)
// 		} catch (err) {
// 			next(err)
// 		}
// 	},
// 	getOne: async function (req: Request, res: Response, next: NextFunction) {
// 		try {
// 			const trade = await JobBudget.findById(req.params.id)
// 			res.status(status.OK).json(trade)
// 		} catch (err) {
// 			next(err)
// 		}
// 	},
// 	create: async function (req: Request, res: Response, next: NextFunction) {
// 		try {
// 			const { body } = req
// 			const newJobBudget = new JobBudget({
// 				...body,
// 			})

// 			await newJobBudget.save()
// 			res.status(status.CREATED).json(newJobBudget)
// 		} catch (err) {
// 			next(err)
// 		}
// 	},
// 	update: async function (req: Request, res: Response, next: NextFunction) {
// 		try {
// 			const { body } = req
// 			const updatedJobBudget = await JobBudget.findByIdAndUpdate(
// 				req.params.id,
// 				{ ...body }
// 			)

// 			res.status(status.OK).json(updatedJobBudget)
// 		} catch (err) {
// 			next(err)
// 		}
// 	},
// 	remove: async function (_: Request, res: Response) {
// 		res.status(201).end()
// 	},
// }
