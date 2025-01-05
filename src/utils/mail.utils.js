const nodemailer = require("nodemailer")
const config = require("../config")

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: config.smpt.host,
    port: config.smpt.port,
    secure: config.smpt.secure,
    auth: {
        user: config.smpt.user,
        pass: config.smpt.pass  
    }
})

const sendMail = (from , to , subject , content) => {
    try {
        let result = transporter.sendMail({
            from,
            to,
            subject,
            html: content,
        })

        return result
    } catch (error) {
        console.error(error)
        return false
    }
}

module.exports = {
    sendMail,
}