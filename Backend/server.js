
import "dotenv/config";

import app from "./app.js";
import connectToDB from "./src/config/database.js";
import { resume, jobDescription, selfDescription } from "./src/services/temp.js";
import generateInterviewReport from "./src/services/ai.services.js";

async function startServer() {
    try {
        await connectToDB();

        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });

        await generateInterviewReport({
            resume,
            selfDescription,
            jobDescription
        });

    } catch (err) {
        console.error("Server startup failed:", err);
    }
}

startServer();
