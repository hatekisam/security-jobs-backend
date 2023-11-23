import express from "express";
import { accountController } from "../controllers";
import validator from "../middlewares/validator";
import {
  idValidation,
  paginateValidations,
  accountValidations,
  companyValidations,
} from "../validations";
import accessControl from "../middlewares/accessControl";

const router = express.Router();

// router.get(
//   "/search",
//   accessControl("ALL"),
//   validator.query(paginateValidations.query),
//   accountController.searchUser
// );

router.get(
  "/become-user/",
  accessControl("ALL"),
  validator.params({ id: idValidation }),
  validator.body(accountValidations.becomeUser),
  accountController.becomeUser
);
router.get(
  "/become-recruiter/",
  accessControl("ALL"),
  validator.params({ id: idValidation }),
  validator.body(companyValidations.newCompany),
  accountController.becomeRecruiter
);

router.delete(
  "/:id",
  accessControl(["ADMIN"]),
  validator.params({ id: idValidation }),
  accountController.deleteAccount
);

export default router;
