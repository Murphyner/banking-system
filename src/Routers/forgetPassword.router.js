const { Router } = require("express")
const validationMiddleware = require("../middlewares/validation.middleware")
const forgetPasswordValidations = require("../validations/forgetPassword.validation")
const forgetPasswordControllers = require("../Controllers/forgetPassword.controllers")
const path = require("path");


const forgetPasswordRouter = Router()


console.log("Resolved views path:", path.resolve(__dirname, "../views/home.hbs"));

forgetPasswordRouter.get("/" , (req , res  ) => { 
    res.render("forget-password" ,{layout: false})
})
forgetPasswordRouter.post("/" , 
    validationMiddleware(forgetPasswordValidations.createForgetPasswordToken),
    forgetPasswordControllers.createForgetPasswordToken
)

module.exports = forgetPasswordRouter