const ActivationModel = require("../models/Activation.model")
const User = require("../models/User.model")
const { NotFoundError } = require("../utils/error.utils")
const uuid = require("uuid")
const datefns = require("date-fns")
const { sendMail } = require("../utils/mail.utils")
const config = require("../config")
const renderTemplate = require("../utils/template.utils")

const createForgetPasswordToken = async (email) => {
    const user = await User.findOne({where: { email }})

    if(!user) throw new NotFoundError("User with this email does not exist")
    
    const activationToken = uuid.v4()    
    await ActivationModel.create({
        userId: user.id,
        token: activationToken,
        expireDate: datefns.addMinutes(new Date() , 10),
        type: "resetPassword"
    })
    console.log(datefns.addMinutes(new Date(), 10));
    

    const mailContent = await renderTemplate("reset-password" , {
        user: user.toJSON(),
        websiteUrl: config.websiteURL,
        activationUrl: `${config.websiteURL}/api/forget_password/token=${activationToken}`
    })
    await sendMail(config.smpt.from , user.email , "Reset Password", mailContent )

    return {
        message: "activation token is sent",
    };
}

const forgetPasswordServices = {
    createForgetPasswordToken
}

module.exports = forgetPasswordServices