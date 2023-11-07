import Joi from 'joi'

export default {
        createFaq: Joi.object({
                question: Joi.string().required(),
                answer: Joi.string().required(),
                category: Joi.string().required(),
        }),
}
