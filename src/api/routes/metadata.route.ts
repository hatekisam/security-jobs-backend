import express from 'express'
import { metadataController } from '../controllers'
import { METADATA_IDS } from '../controllers/metadata.controller'
import validator from '../middlewares/validator'
import { metadataValidations } from '../validations'

const router = express.Router()

// METADATA_IDS.forEach((metadataId) => {
// 	router.get(`/${metadataId}`, metadataController[metadataId].getAll)
// 	router.get(`/${metadataId}/:id`, metadataController[metadataId].getOne)
// 	router.post(
// 		`/${metadataId}`,
// 		validator.body(metadataValidations.newMetadata),
// 		metadataController[metadataId].create
// 	)
// 	router.put(
// 		`/${metadataId}/:id`,
// 		validator.body(metadataValidations.updateMetadata),
// 		metadataController[metadataId].update
// 	)
// })

export default router
