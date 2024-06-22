const express = require("express")
const URL = require("./models/url")
const path = require("path")
cookieParser = require('cookie-parser')

const mongoose = require("mongoose")

const urlRouter = require("./routes/url")
const staticRouter = require("./routes/static")
const userRouter = require("./routes/user")
const { checkUserIsLoginOrNot, restrictTo } = require("./middleware/auth")

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the directory where your views are located
app.set('views', path.resolve("./views"));

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))


const PORT = 8000;

mongoose.connect("mongodb://localhost:27017/e-commerce").then(() => {
    console.log("mongodb connected ");
}).catch(err => {
    console.log("mongodb connection fail ", err);
})
app.use(checkUserIsLoginOrNot)
app.use("/url", restrictTo(["normal", "admin"]), urlRouter)
app.use("/", staticRouter)
app.use("/user", userRouter)


app.listen(PORT, () => {
    console.log("Server is running in PORT :", PORT);
})