const dotenv = require("dotenv")
const path = require("path")

const envPath = path.join(__dirname , "../../.env")
dotenv.config({path: envPath})

module.exports = {
    port: process.env.PORT,
    websiteURL: process.env.APP_URL,
    databaseURL: process.env.DATABASE_URL,
    privateKay: process.env.JWT_SECRET,
    smpt: {
        from: process.env.SMTP_FROM,
        host: process.env.SMTP_HOST,
        port: +process.env.SMTP_PORT || 485,
        secure: process.env.SMTP_SECURE == 1,
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
}