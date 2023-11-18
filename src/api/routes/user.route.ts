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

router.get(
  "/search",
  validator.query(paginateValidations.query),
  accountController.searchUser
);

router.get("/", accountController.getAllAccounts);

router.get(
  "/:id",
  validator.params({ id: idValidation }),
  accountController.getAccount
);

router.put(
  "/:id",
  accessControl("ALL"),
  validator.params({ id: idValidation }),
  validator.body(accountValidations.updateAccount),
  accountController.updateAccount
);

router.delete(
  "/:id",
  accessControl(["ADMIN"]),
  validator.params({ id: idValidation }),
  accountController.deleteAccount
);

export default router;
