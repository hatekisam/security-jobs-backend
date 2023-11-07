import Joi from 'joi'

export default Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'must be an object id')
