const User = require("../models/User.model")
const { UnauthorizedError } = require("../utils/error.utils")
const { decodeToken } = require("../utils/jwt.utils")

const authMiddleware = async (req ,res , next) => {
    let token = req.headers.authorization || ""
    token = token.split(" ")[1]

    if(!token) return next(new UnauthorizedError())

    const payload = decodeToken(token)

    if(!payload?.userID) return next(new UnauthorizedError())

    let user = await User.findOne({where: {id: payload.userID}})

    if(!user) return next(new UnauthorizedError())
    
    req.user = user

    next()
}

module.exports = authMiddleware