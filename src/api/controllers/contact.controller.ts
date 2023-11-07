import { NextFunction, Request, Response } from 'express'
import status from 'http-status'
import { contactService } from '../services'
import APIError from '../helpers/APIError'

const createContact = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { body } = req
		const savedContact = await contactService.createContact(body)
		res.status(status.CREATED).json(savedContact)
	} catch (err) {
		next(err)
	}
}

const getContact = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const contact = await contactService.getContactById(req.params.id)

		if (!contact) throw new APIError(status.NOT_FOUND, 'Contact not found')

		res.json(contact)
	} catch (err) {
		next(err)
	}
}

const getAllContacts= async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const contacts = await contactService.getAllContacts()
		res.json(contacts)
	} catch (err) {
		next(err)
	}
}

const updateContact = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.params.id
		const { body } = req

		const updatedContact = await contactService.updateContact(id, body)

		if (!updatedContact) throw new APIError(status.NOT_FOUND, 'Contact does not exist')

		res.status(status.OK).json(updatedContact)
	} catch (err) {
		next(err)
	}
}

const deleteContact = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await contactService.deleteContact(req.params.id)
		res.status(status.NO_CONTENT).end()
	} catch (err) {
		next(err)
	}
}

export default {
	createContact,
	deleteContact,
	updateContact,
	getAllContacts,
	getContact
}
