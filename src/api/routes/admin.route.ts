import express from "express";
import { adminController } from "../controllers";
import validator from "../middlewares/validator";
import { adminValidations, paginateValidations } from "../validations";
import accessControl from "../middlewares/accessControl";

const router = express.Router();

router.post(
  "/",
  accessControl(["ADMIN"]),
  validator.body(adminValidations.newAdmin),
  adminController.createAdmin
);

router.get(
  "/",
  accessControl(["ADMIN"]),
  adminController.getAllAdmins
);

router.get(
  "/search",
  accessControl("ALL"),
  validator.query(paginateValidations.query),
  adminController.searchAdmin
);

router.get(
  "/:id",
  accessControl(["ADMIN"]),
  adminController.getAdmin
);

router.put(
  "/:id",
  accessControl(["ADMIN"]),
  validator.body(adminValidations.updateAdmin),
  adminController.updateAdmin
);

router.delete(
  "/:id",
  accessControl(["ADMIN"]),
  adminController.deleteAdmin
);

// suspend admin
export default router;
