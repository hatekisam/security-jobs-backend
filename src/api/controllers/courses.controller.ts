import { NextFunction, Request, Response } from 'express'
import status from 'http-status'
import { courseService } from '../services'
import APIError from '../helpers/APIError'

const createCourse = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { body } = req
		const savedCourse = await courseService.createCourse(body)
		res.status(status.CREATED).json(savedCourse)
	} catch (err) {
		next(err)
	}
}

const getCourseById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const course = await courseService.getCourseById(req.params.id)

		if (!course) throw new APIError(status.NOT_FOUND, 'Course not found')

		res.json(course)
	} catch (err) {
		next(err)
	}
}

const getAllCourses= async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const courses = await courseService.getAllCourses()
		res.json(courses)
	} catch (err) {
		next(err)
	}
}

const updateCourses = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.params.id
		const { body } = req

		const updatedCourses = await courseService.updateCourse(id, body)

		if (!updatedCourses) throw new APIError(status.NOT_FOUND, 'Course does not exist')

		res.status(status.OK).json(updatedCourses)
	} catch (err) {
		next(err)
	}
}

const deleteCourses = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await courseService.deleteCourse(req.params.id)
		res.status(status.NO_CONTENT).end()
	} catch (err) {
		next(err)
	}
}

export default {
	createCourse,
	deleteCourses,
	updateCourses,
	getAllCourses,
	getCourseById
}
