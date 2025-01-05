const validationMiddleware = (schema) => {
    return (req , res, next) => {
        const {success , data , error} =  schema.safeParse(req.body)

        if(!success) return res.status(400).json({error: error.issues})

        next()
    }
} 

module.exports = validationMiddleware