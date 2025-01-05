const { Router } = require("express")
const userControllers = require("../Controllers/user.controllers")
const userValidations = require("../validations/user.validation")
const validationMiddleware = require("../middlewares/validation.middleware")
const authMiddleware = require("../middlewares/auth.middleware")

const userRouter = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - fullName
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The hashed password of the user (not returned in response)
 *         fullName:
 *           type: string
 *           description: The full name of the user
 *         phone:
 *           type: string
 *           nullable: true
 *           description: The phone number of the user (nullable)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the user was last updated
 *     UserList:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/User'
 *
 * /api/user:
 *   get:
 *     tags:
 *      - User
 *     summary: Get a list of all users
 *     description: Returns a list of all registered users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserList'
 */

userRouter.get("/" , userControllers.userList)
userRouter.post("/" , validationMiddleware(userValidations.create), userControllers.create)
userRouter.post("/password" ,authMiddleware, validationMiddleware(userValidations.resetPassword) , userControllers.resetPassword)

module.exports = userRouter