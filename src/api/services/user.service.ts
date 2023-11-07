import { User } from '../models'
import { NewUser, PublicUser } from '../interfaces/User'
import bcrypt from 'bcryptjs'
import APIError from '../helpers/APIError'
import status from 'http-status'
import config from '../../config/config'
import mailer from '../helpers/mailer'

const generateRandomPassword = (length: number): string => {
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
	let password = '';
	for (let i = 0; i <= length; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length);
		password += charset[randomIndex];
	}
	return password;
}

const getUserById = (id: string) => {
	return User.findOne({ _id: id, deleted: false }).populate('profile')
}

const getAllUsers = async () => {
	return User.find({ deleted: false })
}
const createUser = async (body: NewUser) => {
	const existingUser = await User.findOne({
		$or: [
			{ email: body.email },
			{ phone: body.phone },
		],
	})
	if (existingUser) {
		if (existingUser.email === body.email)
			throw new APIError(
				status.CONFLICT,
				`User with email ${body.email} already exists!`
			)
		throw new APIError(
			status.CONFLICT,
			`User with phone ${body.phone} already exists`
		)
	}
	const password = await bcrypt.hash(body.password, config.BCRYPT_SALT)
	const newUser = new User({
		...body,
		password,
	})
	return newUser.save()
}
const updateUser = (id: string, body: Partial<PublicUser>) => {
	return User.findByIdAndUpdate(id, { $set: { ...body } })
}

const deleteUser = async (id: string) => {
	await User.findByIdAndUpdate(id, { $set: { deleted: true } }, { new: true })
}

const suspendUser = async (id: string) => {
	return User.findByIdAndUpdate(id, { $set: { suspended: true } }, { new: true })
}

const reInstateUser = async (id: string) => {
	return User.findByIdAndUpdate(id, { $set: { suspended: false } }, { new: true })
}




export default {
	getUserById,
	getAllUsers,
	createUser,
	updateUser,
	deleteUser,
	suspendUser,
	reInstateUser,
}
