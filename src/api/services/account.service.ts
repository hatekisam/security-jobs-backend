import { Account, User } from "../models";
import { NewUser, PublicUser } from "../interfaces/User";
import bcrypt from "bcryptjs";
import APIError from "../helpers/APIError";
import status from "http-status";
import config from "../../config/config";
import mailer from "../helpers/mailer";
import { NewAccount } from "api/interfaces/Account";

const generateRandomPassword = (length: number): string => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
  let password = "";
  for (let i = 0; i <= length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

const getAccountById = (id: string) => {
  return Account.findOne({ _id: id }).populate("user").populate("company");
};

const getAllAccounts = async () => {
  return Account.find({}).populate("user").populate("company");
};
const createAccount = async (body: NewAccount) => {
  const existingAccount = await Account.findOne({
    $or: [{ email: body.email }, { phone: body.phone }],
  });
  if (existingAccount) {
    if (existingAccount.email === body.email)
      throw new APIError(status.CONFLICT, `Email already taken`);
    throw new APIError(status.CONFLICT, `Phone Number already taken`);
  }
  const password = await bcrypt.hash(body.password, config.BCRYPT_SALT);
  const newUser = new Account({
    ...body,
    password,
  });
  return await newUser.save();
};
const updateAccount = (id: string, body: Partial<PublicUser>) => {
  return Account.findByIdAndUpdate(id, { $set: { ...body } });
};

const deleteAccount = async (id: string) => {
  await Account.findByIdAndDelete(id);
};

export default {
  getAccountById,
  getAllAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
};
