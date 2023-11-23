import { Account, Company, User, ICompany } from "../models";
import bcrypt from "bcryptjs";
import APIError from "../helpers/APIError";
import status from "http-status";
import config from "../../config/config";
import { NewAccount } from "api/interfaces/Account";

const becomeUser = async ({
  id,
  username,
}: {
  id: string | undefined;
  username: string;
}) => {
  if (id == undefined)
    throw new APIError(status.UNAUTHORIZED, "You are not logged in");
  const account = await Account.findById(id);
  if (!account)
    throw new APIError(
      status.NOT_FOUND,
      "There is no account with the given id"
    );
  if (account?.user)
    throw new APIError(status.CONFLICT, "You are already a user");
  const newUser = new User({ username: username });
  await newUser.save();
  account.user = newUser.id;
  return account.save();
};

const becomeRecruiter = async (id: string | undefined, body: ICompany) => {
  if (id == undefined)
    throw new APIError(status.UNAUTHORIZED, "You are not logged in");
  const account = await Account.findById(id);
  if (!account)
    throw new APIError(
      status.NOT_FOUND,
      "There is no account with the given id"
    );
  if (account.user)
    throw new APIError(status.CONFLICT, "You are already a recruiter");
  const newCompany = new Company(body);
  await newCompany.save();
  account.company = newCompany.id;
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
  becomeRecruiter,
};
