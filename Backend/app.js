// role of app.js - initiate server (create a server instance) and create routes (apis)

const express = require("express")
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json())
app.use(cookieParser())

/* require all the routes here */
const authRouter = require("./src/routes/auth.routes")

/* using all routes here */
app.use("/api/auth", authRouter)


module.exports = app