import { NextFunction, Request, Response } from "express";
import { accountService } from "../services";
import status from "http-status";
import APIError from "../helpers/APIError";
import paginate from "../helpers/paginate";
import { User } from "../models";
import { IUserRequest } from "../middlewares/accessControl";

const becomeUser = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user?.id !== req.params.id)
      throw new APIError(
        status.BAD_REQUEST,
        "You are not allowed to another person's account"
      );

    await accountService.becomeUser(req.body);
    res.json({ msg: "Became a normal user successfully" });
  } catch (err) {
    next(err);
  }
};

const becomeRecruiter = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user?.id !== req.params.id)
      throw new APIError(
        status.BAD_REQUEST,
        "You are not allowed to another person's account"
      );
    await accountService.becomeRecruiter(req.params.id);
    res.json({ msg: "Become a recruiter successfully" });
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

export default {
  becomeUser,
  becomeRecruiter,
  deleteAccount,
  // searchUser,
};
