import {
  Account,
  Education,
  IEducation,
  IWorkExperience,
  User,
  WorkExperience,
} from "../models";
import { NewUser, PublicUser } from "../interfaces/User";
import bcrypt from "bcryptjs";
import APIError from "../helpers/APIError";
import status from "http-status";
import config from "../../config/config";
import mailer from "../helpers/mailer";
import { NewAccount } from "api/interfaces/Account";

const getUserById = (id: string) => {
  return Account.findOne({ _id: id }).populate("user");
};

const getAllUsers = async () => {
  return Account.find({ user: { $ne: null } }).populate("user");
};
// const createAccount = async (body: NewAccount) => {
//   const existingAccount = await Account.findOne({
//     $or: [{ email: body.email }, { phone: body.phone }],
//   });
//   if (existingAccount) {
//     if (existingAccount.email === body.email)
//       throw new APIError(status.CONFLICT, `Email already taken`);
//     throw new APIError(status.CONFLICT, `Phone Number already taken`);
//   }
//   const password = await bcrypt.hash(body.password, config.BCRYPT_SALT);
//   const newUser = new Account({
//     ...body,
//     password,
//   });
//   return await newUser.save();
// };
const updateUser = (id: string, body: Partial<PublicUser>) => {
  return Account.findByIdAndUpdate(id, { $set: { ...body } });
};

const addAbout = async (id: string, about: string) => {
  const account = await Account.findById(id);
  await User.findByIdAndUpdate(account?.user?._id, { $set: { about } });
  return Account.findById(id);
};
const addWorkExperience = async (id: string, body: IWorkExperience) => {
  const account = await Account.findById(id);
  if (!account) {
    throw new APIError(status.NOT_FOUND, "Account not found");
  }
  const newWork = new WorkExperience(body);
  await newWork.save();
  await User.findByIdAndUpdate(account?.user?._id, {
    $push: { workExperience: newWork.id },
  });
  return await Account.findById(id);
};

const addEducation = async (id: string, body: IEducation) => {
  const account = await Account.findById(id);
  if (!account) {
    throw new APIError(status.NOT_FOUND, "Account not found");
  }
  const education = new Education(body);
  await education.save();
  await User.findByIdAndUpdate(account?.user?._id, {
    $push: { education: education.id },
  });
  return await Account.findById(id);
};

const deleteUser = async (id: string) => {
  await Account.findByIdAndDelete(id);
};

export default {
  getUserById,
  getAllUsers,
  addWorkExperience,
  addEducation,
  addAbout,
  // createAccount,
  updateUser,
  deleteUser,
};
