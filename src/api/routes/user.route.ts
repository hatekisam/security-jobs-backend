import express from "express";
import { userController } from "../controllers";
import validator from "../middlewares/validator";
import {
  idValidation,
  paginateValidations,
  accountValidations,
  userValidations,
} from "../validations";
import accessControl from "../middlewares/accessControl";

const router = express.Router();

// router.get(
//   "/search",
//   validator.query(paginateValidations.query),
//   userController.searchUser
// );

router.get("/", accessControl("ALL"), userController.getAllUsers);

router.get(
  "/:id",
  accessControl("ALL"),
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
  "/profile/about",
  accessControl("ALL"),
  validator.body(userValidations.addAbout),
  userController.addAbout
);

router.post(
  "/profile/work",
  accessControl("ALL"),
  validator.body(userValidations.addWorkExperience),
  userController.addWorkExperience
);
router.post(
  "/profile/education",
  accessControl("ALL"),
  validator.body(userValidations.addEducation),
  userController.addEducation
);

router.delete(
  "/:id",
  accessControl(["ADMIN"]),
  validator.params({ id: idValidation }),
  userController.deleteUser
);

export default router;
