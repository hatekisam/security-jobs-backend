import express from "express";
import { userController } from "../controllers";
import validator from "../middlewares/validator";
import {
  idValidation,
  paginateValidations,
  accountValidations,
} from "../validations";
import accessControl from "../middlewares/accessControl";
import userValidations from "api/validations/user.validations";

const router = express.Router();

// router.get(
//   "/search",
//   validator.query(paginateValidations.query),
//   userController.searchUser
// );

router.get("/", userController.getAllUsers);

router.get(
  "/:id",
  validator.params({ id: idValidation }),
  userController.getUserById
);

router.put(
  "/:id",
  accessControl("ALL"),
  validator.params({ id: idValidation }),
  validator.body(accountValidations.updateAccount),
  userController.updateUser
);

router.post(
  "/about",
  accessControl("ALL"),
  validator.body(userValidations.addAbout),
  userController.addAbout
)

router.delete(
  "/:id",
  accessControl(["ADMIN"]),
  validator.params({ id: idValidation }),
  userController.deleteUser
);

export default router;
