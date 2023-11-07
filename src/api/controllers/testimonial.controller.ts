import { testimonialService } from "../services"
import { NextFunction, Request, Response } from "express"
import status from 'http-status'
import APIError from '../helpers/APIError'


const createTestimonial = async (
        req: Request,
        res: Response,
        next: NextFunction
) => {
        try {
                const { body } = req
                const savedtestimonial = await testimonialService.createTestimonial(body)
                res.status(status.CREATED).json(savedtestimonial)
        } catch (err) {
                next(err)
        }
}

const getTestimonial = async (req: Request, res: Response, next: NextFunction) => {
        try {
                const testimonial = await testimonialService.getTestimonialById(req.params.id)

                if (!testimonial) throw new APIError(status.NOT_FOUND, 'Testimonial not found')

                res.json(testimonial)
        } catch (err) {
                next(err)
        }
}

const getAllTestimonials = async (_req: Request, res: Response, next: NextFunction) => {
        try {
                const testimonials = await testimonialService.getAllTestimonials()
                res.json(testimonials)
        } catch (err) {
                next(err)
        }
}

const updateTestimonial = async (req: Request, res: Response, next: NextFunction) => {
        try {
                const id = req.params.id
                const { body } = req

                const updatedTestimonial = await testimonialService.updateTestimonial(id, body)

                if (!updatedTestimonial) throw new APIError(status.NOT_FOUND, 'Testimonial does not exist')

                res.status(status.OK).json(updatedTestimonial)
        } catch (err) {
                next(err)
        }
}

const deleteTestimonial = async (req: Request, res: Response, next: NextFunction) => {
        try {
                await testimonialService.deleteTestimonial(req.params.id)
                res.status(status.NO_CONTENT).end()
        } catch (err) {
                next(err)
        }
}

export default {
        createTestimonial,
        getTestimonial,
        getAllTestimonials,
        deleteTestimonial,
        updateTestimonial
}