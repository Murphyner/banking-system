const { z } = require("zod")

const create = z.object({
    fullName: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6).max(100),
})

const resetPassword = z.object({
    currentPassword: z.string().min(6).max(100),
    newPassword: z.string().min(6).max(100),
    repeatPassword: z.string().min(6).max(100)
})
const userValidations = {
    create,
    resetPassword
}
module.exports = userValidations