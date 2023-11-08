import express from 'express'
import { userController } from '../controllers'
import validator from '../middlewares/validator'
import {
	idValidation,
	paginateValidations,
	userValidations,
} from '../validations'
import accessControl from '../middlewares/accessControl'
import UserController from '../controllers/user.controller'

const router = express.Router()




router.post(
	'/',
	validator.body(userValidations.newUser),
	userController.createUser
)
router.get(
	'/search',
	accessControl('ALL'),
	validator.query(paginateValidations.query),
	UserController.searchUser
)

router.get('/',
	accessControl('ALL'),
	userController.getAllUsers
)


router.get(
	'/:id',
	validator.params({ id: idValidation }),
	accessControl('ALL'),
	userController.getUser
)
router.post(
	'/:id/suspend',
	accessControl(['ADMIN',]),
	validator.params({ id: idValidation }),
	userController.suspendUser
)
router.post(
	'/:id/reinstate',
	accessControl(['ADMIN',]),
	validator.params({ id: idValidation }),
	userController.reInstateUser
)

// router.post(
// 	'/:id/reinstate',
// 	accessControl(['ADMIN',]),
// 	validator.params({ id: idValidation }),
// 	userController.reInstateUser
// )





/**
 * @swagger
 *  /api/v1/user/{id}:
 *   put:
 *     summary: Update a User
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the User
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       '200':
 *         description: Updated a User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
  *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error:  message
   *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error:  message
 */
router.put(
	'/:id',
	accessControl('ALL'),
	validator.params({ id: idValidation }),
	validator.body(userValidations.updateUser),
	userController.updateUser
)



/**
    * @swagger
    *  /api/v1/user/{id}:
    *   delete:
    *     summary: Delete a User
    *     tags: [User]
    *     parameters:
    *       - name: id
    *         in: path
    *         description: ID of the User
    *         required: true
    *         schema:
    *           type: string
    *     responses:
    *       '204':
    *         description: User deleted
     *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error:  message
      *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error:  message
    */
router.delete(
	'/:id',
	accessControl(['ADMIN']),
	validator.params({ id: idValidation }),
	userController.deleteUser
)
export default router
