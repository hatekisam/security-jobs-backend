import express from "express";
import { accountController } from "../controllers";
import validator from "../middlewares/validator";
import {
  idValidation,
  paginateValidations,
  accountValidations
} from "../validations";
import accessControl from "../middlewares/accessControl";

const router = express.Router();

router.post(
  "/",
  validator.body(accountValidations.newAccount),
  accountController.createAccount
);
router.get(
  "/search",
  accessControl("ALL"),
  validator.query(paginateValidations.query),
  accountController.searchUser
);

router.get("/", accessControl("ALL"), accountController.getAllAccounts);

router.get(
  "/:id",
  validator.params({ id: idValidation }),
  accessControl("ALL"),
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
