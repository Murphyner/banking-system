const { Sequelize } = require("sequelize");
const config = require(".")


const sequelize = new Sequelize(config.databaseURL)

sequelize.authenticate()
.then(() => {
    console.log("Database is successfully connected");
})
.catch((error) => {
    console.error("Database connection is failed" , error)
})

sequelize.sync({alter: true})

module.exports = sequelize