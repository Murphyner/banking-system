const  express = require("express")
require("./config/database")
const cors = require("cors")
const config = require("./config")
const path = require("path")
const router = require("./Routers")
const errorMiddleware = require("./middlewares/error.middleware")
const { engine } = require("express-handlebars")
const swaggerUI = require("swagger-ui-express")
const swagger = require("./swagger")

const app = express()
app.use(cors())
app.use(express.json())


app.use("/docs" , swaggerUI.serve , swaggerUI.setup(swagger))

// Template Engine
app.engine(
    ".hbs",
    engine({
        extname: ".hbs",
    })
);

const viewPath = path.join(__dirname, "../views");
app.set("views", viewPath);
app.set("view engine", ".hbs");


app.get('/', (req, res) => {
    res.render('home' , req.query);
});

app.use("/api", router)


const publicPath = path.join(__dirname, "../public")
app.use("/", express.static(publicPath))

app.get("/", (req , res) => {
    res.json({message: "The app is running"})
})

app.use(errorMiddleware)

app.listen(config.port , () => {
    console.log(`The app is running on http://localhost:${config.port}`);
    
})