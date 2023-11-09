import { NextFunction, Request, Response } from "express";
import { accountService } from "../services";
import status from "http-status";
import APIError from "../helpers/APIError";
import paginate from "../helpers/paginate";
import { User } from "../models";
import { IUserRequest } from "../middlewares/accessControl";
import bcrypt from "bcryptjs";
const getAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await accountService.getAccountById(req.params.id);
    if (!user) throw new APIError(status.NOT_FOUND, "User not found");
    res.json(user.toJsonWithoutPassword());
  } catch (err) {
    next(err);
  }
};

const getAllAccounts = async (_req: Request, res: Response) => {
  const accounts = await accountService.getAllAccounts();
  const transformedAccounts = accounts.map((account) =>
    account.toJsonWithoutPassword()
  );
  res.json(transformedAccounts);
};

const createAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body: newUser } = req;
    const savedUser = await accountService.createAccount(newUser);
    res.status(status.CREATED).json(savedUser.toJsonWithoutPassword());
  } catch (err) {
    next(err);
  }
};

const updateAccount = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    if (req.user?.id !== id)
      throw new APIError(
        status.BAD_REQUEST,
        "You are not allowed to update another user's account"
      );

    const updatedAccount = await accountService.updateAccount(id, {
      ...req.body,
      ...(req.body.password && {
        password: bcrypt.hashSync(req.body.password),
      }),
    });

    if (!updatedAccount)
      throw new APIError(status.NOT_FOUND, "Account does not exist");

    res.status(status.OK).json(updatedAccount.toJsonWithoutPassword());
  } catch (err) {
    next(err);
  }
};

const deleteAccount = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user?.id !== req.params.id)
      throw new APIError(
        status.BAD_REQUEST,
        "You are not allowed to delete another user's account"
      );

    await accountService.deleteAccount(req.params.id);
    res.status(status.NO_CONTENT).end();
  } catch (err) {
    next(err);
  }
};

const searchUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await paginate(req, User);

    res.status(status.OK).json({
      ...response,
      items: response.items.map((user: any) => user.toJsonWithoutPassword()),
    });
  } catch (err) {
    next(err);
  }
};
export default {
  getAccount,
  getAllAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
  searchUser,
};
