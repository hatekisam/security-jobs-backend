import { Request } from 'express'
import { Model } from 'mongoose'

export default async function paginate<T>(
	req: Request,
	model: Model<T>,
	populate: string[] = []
) {
	const page = parseInt(String(req.query.page)) - 1 || 0
	const limit = parseInt(String(req.query.limit)) || 5
	const search = req.query.search?.toString() || ''
	const filterPair = req.query.filter?.toString() || ':'

	let sort: string | string[] = String(req.query.sort) || ''
	sort ? (sort = String(req.query.sort).split(',')) : (sort = [sort])

	// eslint-disable-next-line
	let sortBy: any = {}

	if (Array.isArray(sort)) {
		if (sort[1]) {
			sortBy[sort[0]] = sort[1]
		} else {
			sortBy[sort[0]] = 'asc'
		}
	}

	const [filterKey, filterValue] = filterPair.split(':')
	const filter = {
		...(search && { $text: { $search: search } }),
		...(filterKey && { [filterKey === 'id' ? '_id' : 'id']: filterValue }),
	}

	const items = await model
		.find(filter)
		.sort(sortBy)
		.skip(page * limit)
		.limit(limit)
		.populate(populate)
		.exec()
	const total = await model.countDocuments(filter)

	return {
		total,
		page: page + 1,
		limit,
		items,
	}
}
