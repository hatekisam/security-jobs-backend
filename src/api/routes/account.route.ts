import express from "express";
import { accountController } from "../controllers";
import validator from "../middlewares/validator";
import {
  idValidation,
  paginateValidations,
  accountValidations,
} from "../validations";
import accessControl from "../middlewares/accessControl";

const router = express.Router();

// router.get(
//   "/search",
//   accessControl("ALL"),
//   validator.query(paginateValidations.query),
//   accountController.searchUser
// );

router.put(
  "/become-user/:id",
  accessControl("ALL"),
  validator.params({ id: idValidation }),
  validator.body(accountValidations.becomeUser),
  accountController.becomeUser
);
router.put(
  "/become-recruiter/:id",
  accessControl("ALL"),
  validator.params({ id: idValidation }),
  accountController.becomeUser
);

router.delete(
  "/:id",
  accessControl(["ADMIN"]),
  validator.params({ id: idValidation }),
  accountController.deleteAccount
);

export default router;
