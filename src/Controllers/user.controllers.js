const userServices = require("../Services/user.services")

const userList = async (req , res , next) => {
    try {
        const response = await userServices.userList()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ error })
    }
}

const create = async (req  , res, next) => {
    try {
        const response = await userServices.create(req.body)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error})
    }
}

const resetPassword = async (req , res ,next) => {
    try {
        const response = await userServices.resetPassword(req.user.id, req.body)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const userControllers = {
    userList,
    create,
    resetPassword
}

module.exports  = userControllers