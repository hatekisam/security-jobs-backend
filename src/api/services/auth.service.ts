import { Account, Admin, User } from "../models";
import APIError from "../helpers/APIError";
import status from "http-status";
import bcrypt from "bcryptjs";
import config from "../../config/config";
import { NewUser } from "../interfaces/User";
import { createAuthToken } from "../helpers/authToken";
import {
  generateAppToken,
  generateVerificationCode,
  verifyAppToken,
} from "../helpers/emailToken";
import mailer from "../helpers/mailer";
import { NewAccount } from "api/interfaces/Account";
import accountService from "./account.service";

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const account = await Account.findOne({ email })
    .populate("user")
    .populate("company");
  if (!account) throw new APIError(status.UNAUTHORIZED, "Email does not exist");
  const isValidPassword = await bcrypt.compare(password, account.password);
  if (!isValidPassword)
    throw new APIError(status.UNAUTHORIZED, "Incorrect password");

  return {
    token: createAuthToken({
      id: account.id,
      email: account.email,
      name: account.name,
    }),
    account: account.toJsonWithoutPassword(),
  };
};

const loginAdmin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const admin = await Admin.findOne({ email });
  if (!admin) throw new APIError(status.UNAUTHORIZED, "Email does not exist");
  const isValidPassword = await bcrypt.compare(password, admin.password);

  if (!isValidPassword)
    throw new APIError(status.UNAUTHORIZED, "Incorrect password");

  return {
    token: createAuthToken({
      id: admin.id,
      email: admin.email,
      name: admin.name,
    }),
    user: admin.toJsonWithoutPassword(),
  };
};
const register = async (body: NewAccount) => {
  const account = await accountService.createAccount(body);
  const token = await generateAppToken(account.email, "VERIFY_EMAIL");
  return {
    token: createAuthToken({
      id: account.id,
      name: body.name,
      email: body.email,
    }),
    account: account.toJsonWithoutPassword(),
  };
};

const newPassword = async ({
  password,
  email,
  token,
}: {
  password: string;
  email: string;
  token: string;
}) => {
  const verifiedTokenPayload = await verifyAppToken(
    email,
    token,
    "PASSWORD_RESET"
  );

  if (verifiedTokenPayload) {
    const hashedPass = await bcrypt.hash(password, config.BCRYPT_SALT);

    await Account.updateOne({ email }, { password: hashedPass });

    return { msg: "Password updated successfully" };
  } else {
    throw new APIError(status.BAD_REQUEST, "Token invalid or expired");
  }
};

const forgotPassword = async (email: string) => {
  const token = await generateAppToken(email, "PASSWORD_RESET");
  mailer.sendPasswordResetEmail(email, token);
  return { msg: "Please check your email for the password reset link" };
};

const verifyMail = async ({ email, code }: { email: string; code: string }) => {
  const validToken = await verifyAppToken(email, code, "VERIFY_EMAIL");

  if (!validToken)
    throw new APIError(status.BAD_REQUEST, `Token invalid or expired`);

  const user = await Account.findOneAndUpdate(
    { email },
    { emailVerified: true },
    { new: true }
  );

  return {
    user: user,
    msg: "Email verified successfully",
  };
};

const sendVerifyEmail = async (email: string) => {
  const code = await generateVerificationCode(email);
  mailer.sendVerificationEmail(email, code);
  return { msg: "The verification code sent successfully to the email" };
};

export default {
  login,
  register,
  loginAdmin,
  forgotPassword,
  newPassword,
  verifyMail,
  sendVerifyEmail,
};
