import express from "express";
import { authController } from "../controllers";
import validator from "../middlewares/validator";
import {
  adminValidations,
  authValidation,
  accountValidations,
} from "../validations";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API responsible for all authentication services
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Sign In a user.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

router.post(
  "/login",
  validator.body(accountValidations.loginAccount),
  authController.login
);

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Sign up user.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone_number:
 *                 type: string
 *             required:
 *               - fullname
 *               - email
 *               - password
 *               - phone_number
 *     responses:
 *       200:
 *         description: Successful registration
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */

router.post(
  "/register",
  validator.body(accountValidations.newAccount),
  authController.register
);

router.post(
  "/forgot-password/",
  validator.body(authValidation.forgotPassword),
  authController.forgotPassword
);

// router.post(
//   "/verify-email/",
//   validator.body(accountValidations.verifyEmail),
//   authController.verifyMail
// );

router.post(
  "/new-password",
  validator.body(authValidation.newPassword),
  authController.newPassword
);

router.post(
  "/admin/login",
  validator.body(adminValidations.loginAdmin),
  authController.loginAdmin
);

router.post(
  "/verify-mail",
  validator.body(authValidation.verifyMail),
  authController.verifyMail
);

router.post(
  "/send-verification-email",
  validator.body(authValidation.sendVerifyMail),
  authController.sendVerifyMail
);

export default router;
