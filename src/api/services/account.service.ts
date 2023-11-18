import { Account, User } from "../models";
import bcrypt from "bcryptjs";
import APIError from "../helpers/APIError";
import status from "http-status";
import config from "../../config/config";
import { NewAccount } from "api/interfaces/Account";


const becomeUser = async ({
  id,
  username,
}: {
  id: string;
  username: string;
}) => {
  const newUser = new User({ username: username });
  await newUser.save();
  const account = await Account.findByIdAndUpdate(
    id,
    {
      $set: { user: newUser },
    },
    { new: true }
  );
  return await account?.save();
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

const deleteAccount = async (id: string) => {
  await Account.findByIdAndDelete(id);
};

export default {
  createAccount,
  deleteAccount,
  becomeUser,
};
