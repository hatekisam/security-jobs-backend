import express from 'express'
import validator from '../middlewares/validator'
import { courseValidations } from '../validations'
import { coursesController } from '../controllers'

const router = express.Router()
/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: API for managing operations related to courses
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NewCourse:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the course.
 *         topics:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of names of the topics to be included in the course.
 *         description:
 *           type: string
 *           description: The description of the course.
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the course.
 *         topics:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of topic IDs related to this course.
 *         description:
 *           type: string
 *           description: The description of the course.
 *         reviews:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of course review IDs.
 */

/**
 * @swagger
 *  /api/v1/course:
 *   get:
 *     summary: Get all Courses
 *     tags: [Courses]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
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
 */
router.get(
    '/',
    coursesController.getAllCourses
)
/**
 * @swagger
 *  /api/v1/course/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the Course
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
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
 */
router.get(
    '/:id',
    coursesController.getCourseById
)

/**
 * @swagger
 *  /api/v1/course:
 *   post:
 *     summary: Create a new Course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCourse'
 *     responses:
 *       '201':
 *         description: Contact created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
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
 */
router.post(
    '/',
    validator.body(courseValidations.createCourse),
    coursesController.createCourse
)

/**
 * @swagger
 * /api/v1/course/{id}:
 *   put:
 *     summary: Update a Course
 *     tags: [Courses]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the Course
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Updated Course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *               example:
 *                 error: "message"
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the course.
 *         description:
 *           type: string
 *           description: The description of the course.
 */

router.put(
    '/:id',
    coursesController.updateCourses
)

/**
    * @swagger
    *  /api/v1/course/{id}:
    *   delete:
    *     summary: Delete a Course
    *     tags: [Courses]
    *     parameters:
    *       - name: id
    *         in: path
    *         description: ID of the Course
    *         required: true
    *         schema:
    *           type: string
    *     responses:
    *       '204':
    *         description: Course deleted
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
    */
router.delete(
    '/:id',
    coursesController.deleteCourses
)

export default router
