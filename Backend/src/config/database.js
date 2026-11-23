const mongoose = require("mongoose")

async function connectToDB() {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is missing from .env")
    }

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to Database")
    } catch (err) {
        console.error("Database connection failed:", err.message)
        throw err
    }
}

module.exports = connectToDB