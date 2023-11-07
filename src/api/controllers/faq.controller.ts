import APIError from '../helpers/APIError'
import { NextFunction, Request, Response } from "express"
import status from 'http-status'
import { faqService } from "../services"


const createFaq = async (
        req: Request,
        res: Response,
        next: NextFunction
) => {
        try {
                const { body } = req
                const savedfaq = await faqService.createFaq(body)
                res.status(status.CREATED).json(savedfaq)
        } catch (err) {
                next(err)
        }
}

const getFaq = async (req: Request, res: Response, next: NextFunction) => {
        try {
                const faq = await faqService.getFaqById(req.params.id)

                if (!faq) throw new APIError(status.NOT_FOUND, 'Faq not found')

                res.json(faq)
        } catch (err) {
                next(err)
        }
}

const getAllFaqs = async (_req: Request, res: Response, next: NextFunction) => {
        try {
                const faqs = await faqService.getAllFaqs()
                res.json(faqs)
        } catch (err) {
                next(err)
        }
}

const updateFaq = async (req: Request, res: Response, next: NextFunction) => {
        try {
                const id = req.params.id
                const { body } = req

                const updatedFaqs = await faqService.updateFaq(id, body)

                if (!updatedFaqs) throw new APIError(status.NOT_FOUND, 'Faq does not exist')

                res.status(status.OK).json(updatedFaqs)
        } catch (err) {
                next(err)
        }
}

const deleteFaq = async (req: Request, res: Response, next: NextFunction) => {
        try {
                await faqService.deleteFaq(req.params.id)
                res.status(status.NO_CONTENT).end()
        } catch (err) {
                next(err)
        }
}

export default {
        createFaq,
        getFaq,
        getAllFaqs,
        deleteFaq,
        updateFaq
}