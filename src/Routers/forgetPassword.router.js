const { Router } = require("express")
const validationMiddleware = require("../middlewares/validation.middleware")
const forgetPasswordValidations = require("../validations/forgetPassword.validation")
const forgetPasswordControllers = require("../Controllers/forgetPassword.controllers")

const forgetPasswordRouter = Router()


forgetPasswordRouter.get("/:token" , (req , res , next ) => { 
    res.render()
})
forgetPasswordRouter.post("/" , 
    validationMiddleware(forgetPasswordValidations.createForgetPasswordToken),
    forgetPasswordControllers.createForgetPasswordToken
)

module.exports = forgetPasswordRouter