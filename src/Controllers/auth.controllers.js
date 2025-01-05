const authServices = require("../Services/auth.services")

const login = async (req , res , next) => {
    try {
        const response = await authServices.login(req.body)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const register = async (req , res ,next) => {
    try {
        const response = await authServices.register(req.body)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const authControllers = {
    register,
    login
}
module.exports = authControllers
