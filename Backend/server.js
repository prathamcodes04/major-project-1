require("dotenv").config();

const app = require("./app");
const connectToDB = require("./src/config/database");

const {
    resume,
    jobDescription,
    selfDescription
} = require("./src/services/temp");

const generateInterviewReport = require("./src/services/ai.services");

async function startServer() {
    try {
        console.log("1. Connecting to DB...");
        await connectToDB();
        console.log("2. DB connected");

        app.listen(3000, () => {
            console.log("3. Server is running on port 3000");
        });

        // Test run: remove this block once you move report generation into a route
        console.log("4. Calling Gemini (this can take 30-90 seconds)...");
        console.time("Gemini response time");

        generateInterviewReport({ resume, selfDescription, jobDescription })
            .then((report) => {
                console.timeEnd("Gemini response time");
                console.log("5. Interview report generated successfully!");
                console.log(JSON.stringify(report, null, 2));
            })
            .catch((err) => {
                console.timeEnd("Gemini response time");
                console.error("Gemini call failed:", err.message || err);
            });

    } catch (err) {
        console.error("Server startup failed:", err);
        process.exit(1);
    }
}

startServer();