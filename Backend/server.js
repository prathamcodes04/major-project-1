require("dotenv").config() //access all variables from env file in all express server
const app = require("./app")
const connectToDB = require("./src/config/database")

async function startServer() {
    try {
        await connectToDB()
        app.listen(3000, () => {
            console.log("Server is running on port 3000")
        })
    } catch (err) {
        console.error("Failed to start server:", err)
        process.exit(1)
    }
}

startServer()