
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
    httpOptions: {
        timeout: 60000
    }
});

const interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100),

    technicalQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),

    behavioralQuestions: z.array(
        z.object({
            question: z.string(),
            intention: z.string(),
            answer: z.string()
        })
    ),

    skillGaps: z.array(
        z.object({
            skill: z.string(),
            severity: z.enum(["low", "medium", "high"])
        })
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number(),
            focus: z.string(),
            tasks: z.array(z.string())
        })
    ),

    title: z.string()
});

async function generateInterviewReport({
    resume,
    jobDescription,
    selfDescription
}) {
    const prompt = `
        Generate a detailed interview preparation report using the
        candidate information below.

        RESUME:
        ${resume}

        SELF DESCRIPTION:
        ${selfDescription}

        JOB DESCRIPTION:
        ${jobDescription}

        Follow the provided response schema exactly.

        Requirements:
        1. Generate a match score between 0 and 100.
        2. Include technical and behavioral interview questions.
        3. For every question, provide its intention and a suggested answer.
        4. Identify skill gaps and assign their severity.
        5. Create a practical day-wise preparation plan.
        6. Do not add any fields outside the provided schema.
        7. Do not rename any fields.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-4-carbon",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: zodToJsonSchema(interviewReportSchema)
        }
    });

    const report = interviewReportSchema.parse(
        JSON.parse(response.text)
    );

    console.log(JSON.stringify(report, null, 2));

    return report;
}

export default generateInterviewReport;
