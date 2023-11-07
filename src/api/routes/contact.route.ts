import express from 'express'
import validator from '../middlewares/validator'
import { contactValidation } from '../validations'
import { contactController } from '../controllers'

const router = express.Router()
router.get(
	'/',
	contactController.getAllContacts
)

router.get(
	'/:id',
	contactController.getContact
)

router.post(
	'/',
	validator.body(contactValidation.createContact),
	contactController.createContact
)

router.put(
	'/:id',
	contactController.updateContact
)


router.delete(
	'/:id',
	contactController.deleteContact
)

export default router
