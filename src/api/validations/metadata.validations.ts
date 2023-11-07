import Joi from 'joi'
import { GenericMetadata } from '../interfaces/Metadata'
export default {
	newMetadata: Joi.object<GenericMetadata>({
		name: Joi.string().required(),
	}),
	updateMetadata: Joi.object<GenericMetadata>({
		name: Joi.string().optional(),
	}),
}
