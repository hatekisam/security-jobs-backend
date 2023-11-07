import bcrypt from 'bcryptjs'
import APIError from '../helpers/APIError'
import status from 'http-status'
import config from '../../config/config'
import { Admin } from '../models'
import { NewAdmin, PublicAdmin } from '../interfaces/Admin'
const getAdminById = (id: string) => {
	return Admin.findById(id)
}

const getAllAdmins = async () => {
	return Admin.find({})
}
const createAdmin = async (body: NewAdmin) => {
	const password = await bcrypt.hash(body.password, config.BCRYPT_SALT)
	const existingAdmin = await Admin.findOne({
		email: body.email,
	})

	if (existingAdmin) {
		if (existingAdmin.email === body.email)
			throw new APIError(
				status.CONFLICT,
				`Admin with email ${body.email} already exists!`
			)
	}

	const newAdmin = new Admin({
		...body,
		password,
	})

	return newAdmin.save()
}
const updateAdmin = (id: string, body: Partial<PublicAdmin>) => {
	return Admin.findByIdAndUpdate(id, { ...body }, { new: true })
}

const deleteAdmin = async (id: string) => {
	await Admin.findByIdAndDelete(id)
}
export default {
	getAdminById,
	getAllAdmins,
	createAdmin,
	updateAdmin,
	deleteAdmin,
}
