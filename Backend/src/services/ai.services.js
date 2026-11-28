const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job description"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question that can be asked in the interview"),
        intention: z.string().describe("The intention of the interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question that can be asked in the interview"),
        intention: z.string().describe("The intention of the interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

// Zod v4 built-in converter (no zod-to-json-schema needed)
const jsonSchema = z.toJSONSchema(interviewReportSchema)
delete jsonSchema.$schema

const PRIMARY_MODEL = "gemini-3.7-flash"
const FALLBACK_MODEL = "gemini-3.5-flash-lite"

function buildPrompt({ resume, selfDescription, jobDescription }) {
    return `
You are an expert technical interviewer and career coach.
Analyze the candidate against the job description and generate a personalized interview preparation report.

## CANDIDATE RESUME
${resume}

## CANDIDATE SELF DESCRIPTION
${selfDescription}

## JOB DESCRIPTION
${jobDescription}

## INSTRUCTIONS
1. title: the exact job title from the job description.
2. matchScore: an honest score from 0 to 100 based only on what is in the resume and self description.
3. technicalQuestions: exactly 5 questions based on the job's technologies and the candidate's projects.
   Keep "intention" to one sentence and "answer" to 3-4 sentences.
4. behavioralQuestions: exactly 3 questions (teamwork, failure/learning, ownership).
   Keep "intention" to one sentence and "answer" to 3-4 sentences using the STAR method.
5. skillGaps: only real gaps, with severity low/medium/high.
6. preparationPlan: a 7-day plan, with 3 short tasks per day. Prioritize high-severity gaps first.

Be specific to this candidate. Never invent experience. Keep every answer concise.
`
}

async function callGemini(model, prompt) {
    const stream = await ai.models.generateContentStream({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: jsonSchema,
            temperature: 0.4,
            thinkingConfig: { thinkingLevel: "LOW" },
        }
    })

    let text = ""
    for await (const chunk of stream) {
        text += chunk.text || ""
    }

    return interviewReportSchema.parse(JSON.parse(text))
}

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = buildPrompt({ resume, selfDescription, jobDescription })

    try {
        return await callGemini(PRIMARY_MODEL, prompt)
    } catch (err) {
        console.warn(`${PRIMARY_MODEL} failed (${err.message}). Retrying with ${FALLBACK_MODEL}...`)
        return await callGemini(FALLBACK_MODEL, prompt)
    }
}

module.exports = generateInterviewReport