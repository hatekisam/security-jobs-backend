import { NextFunction, Request, Response } from "express";
import { userService } from "../services";
import status from "http-status";
import APIError from "../helpers/APIError";
import paginate from "../helpers/paginate";
import { User } from "../models";
import { IUserRequest } from "../middlewares/accessControl";
import bcrypt from "bcryptjs";
const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) throw new APIError(status.NOT_FOUND, "User not found");
    res.json(user.toJsonWithoutPassword());
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (_req: Request, res: Response) => {
  const accounts = await userService.getAllUsers();
  const transformedAccounts = accounts.map((account) =>
    account.toJsonWithoutPassword()
  );
  res.json(transformedAccounts);
};

// const createAccount = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { body: newUser } = req;
//     const savedUser = await userService.createAccount(newUser);
//     res.status(status.CREATED).json(savedUser.toJsonWithoutPassword());
//   } catch (err) {
//     next(err);
//   }
// };

const addAbout = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?.id)
      throw new APIError(
        status.UNAUTHORIZED,
        "Invalid token"
      );
    const account = await userService.addAbout(req.user.id,req.body.about);
    if (!account)
      throw new APIError(status.NOT_FOUND, "Account does not exist");
    res.status(status.OK).json(account.toJsonWithoutPassword());
  } catch (err) {
    next(err);
  }
};

const addWorkExperience = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?.id)
      throw new APIError(
        status.UNAUTHORIZED,
        "Invalid token"
      );
    const account = await userService.addWorkExperience(req.user.id,req.body);
    if (!account)
      throw new APIError(status.NOT_FOUND, "Account does not exist");
    res.status(status.OK).json(account.toJsonWithoutPassword());
  } catch (err) {
    next(err);
  }
};

const addEducation = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?.id)
      throw new APIError(
        status.UNAUTHORIZED,
        "Invalid token"
      );
    const account = await userService.addEduction(req.user.id,req.body);
    if (!account)
      throw new APIError(status.NOT_FOUND, "Account does not exist");
    res.status(status.OK).json(account.toJsonWithoutPassword());
  } catch (err) {
    next(err);
  }
};

const updateUser = async (
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

    const updatedAccount = await userService.updateUser(id, {
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

const deleteUser = async (
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

    await userService.deleteUser(req.params.id);
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
  getUserById,
  getAllUsers,
  addAbout,
  addWorkExperience,
  addEducation,
  // createAccount,
  updateUser,
  deleteUser,
  searchUser,
};
