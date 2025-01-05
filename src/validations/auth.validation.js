 const { z } = require("zod")

 const login = z.object({
    email: z.string().email().min(3),
    password: z.string().min(6)
 })

const register = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(50),
    fullName: z.string().min(3).optional(),
    phone: z.string().optional(),
});

const authValidations = {
    login,
    register
}

module.exports = authValidations