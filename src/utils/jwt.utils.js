const jwt = require("jsonwebtoken")
const config = require("../config")

const encodePayload = (payload) => {
    const token = jwt.sign(payload , config.privateKay , {expiresIn: "1d"})
    return token
}

const decodeToken = (token) => {
    try {
        const payload = jwt.verify(token, config.privateKay)
        return payload
    } catch (error) {
        return false
    }
}

module.exports = {
    encodePayload,
    decodeToken
}