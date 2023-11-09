import { NextFunction, Request, Response } from "express";
import { adminService } from "../services";
import status from "http-status";
import APIError from "../helpers/APIError";
import { roleGuards } from "../interfaces/Role";
import { NewAdmin } from "../interfaces/Admin";
import { IUserRequest } from "../middlewares/accessControl";
import paginate from "../helpers/paginate";
import { Admin } from "../models";

const getAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const admin = await adminService.getAdminById(req.params.id);

    if (!admin) throw new APIError(status.NOT_FOUND, "Admin not found");

    res.json(admin.toJsonWithoutPassword());
  } catch (err) {
    next(err);
  }
};

const getAllAdmins = async (_req: Request, res: Response) => {
  const admins = await adminService.getAllAdmins();
  const transformedAdmins = admins.map((admin) =>
    admin.toJsonWithoutPassword()
  );
  res.json(transformedAdmins);
};

const createAdmin = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const creator = req.user!;
    const { body: newAdmin }: { body: NewAdmin } = req;

    // if (!roleGuards.isRoleGreater(creator.role, newAdmin.role))
    //   throw new APIError(
    //     status.UNAUTHORIZED,
    //     `You are not allowed to create and admin with role ${newAdmin.role}`
    //   );

    const savedAdmin = await adminService.createAdmin(newAdmin);

    res.status(status.CREATED).json(savedAdmin.toJsonWithoutPassword());
  } catch (err) {
    next(err);
  }
};

const updateAdmin = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const creator = req.user!;
    const id = req.params.id;
    const adminToUpdate = req.body;

    // if (!roleGuards.isRoleGreater(creator.role, adminToUpdate.role))
    //   throw new APIError(
    //     status.UNAUTHORIZED,
    //     `You are not allowed to update an admin with role ${adminToUpdate.role}`
    //   );

    const updatedAdmin = await adminService.updateAdmin(id, req.body);

    if (!updatedAdmin)
      throw new APIError(status.NOT_FOUND, "Admin does not exist");

    res.status(status.OK).json(updatedAdmin.toJsonWithoutPassword());
  } catch (err) {
    next(err);
  }
};

const deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await adminService.deleteAdmin(req.params.id);
    res.status(status.NO_CONTENT).end();
  } catch (err) {
    next(err);
  }
};

const searchAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await paginate(req, Admin);
    res.status(status.OK).json(response);
  } catch (err) {
    next(err);
  }
};

export default {
  getAdmin,
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  searchAdmin,
};
