const User = require("../models/User.model")
const { AppError, NotFoundError } = require("../utils/error.utils")
const bcrypt = require("bcrypt")
const { encodePayload } = require("../utils/jwt.utils")
const renderTemplate = require("../utils/template.utils")
const { sendMail } = require("../utils/mail.utils")
const config = require("../config")

const login = async (params) => {
    let user = await User.findOne({where: {email: params.email}})
    if (!user) throw new NotFoundError("Username or password is not correct")

    let checkPassword = await  bcrypt.compare(params.password , user.password)
    
    if(!checkPassword) throw new NotFoundError("Username or password is not correct")
    
    const token = encodePayload({userID: user.id})
    return {
        token,
        user: {
            ...user,
            password: undefined
        }
    }
}

const register = async (params) => {
    let checkUser = await User.findOne({where: { email: params.email}})
    if (checkUser) throw new AppError("User already exist", 409)

    let hash = await bcrypt.hash(params.password, 10)

    let user = await User.create({...params, password: hash})

    const mailContent = await renderTemplate("welcome-mail" , {
        user: user.toJSON(),
        activationLink: "http://localhost.com",
        supportMail: "info@john.com",
    })

    await sendMail(
        config.smpt.from, 
        user.email , 
        "Welcome to our app",
        mailContent
    )

    return user
}

const authServices = {
    login,
    register
}

module.exports = authServices