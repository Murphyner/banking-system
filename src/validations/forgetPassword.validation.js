const { z }= require("zod")

const createForgetPasswordToken = z.object({
    email: z.string().email(),
})

const forgetPasswordValidations = {
    createForgetPasswordToken
}

module.exports = forgetPasswordValidations