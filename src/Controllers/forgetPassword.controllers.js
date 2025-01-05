const forgetPasswordServices = require("../Services/forgetPassword")

const createForgetPasswordToken = async (req , res , next) => {
    try {
        const response = await forgetPasswordServices.createForgetPasswordToken(req.body.email)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const forgetPasswordControllers = {
    createForgetPasswordToken
}

module.exports = forgetPasswordControllers