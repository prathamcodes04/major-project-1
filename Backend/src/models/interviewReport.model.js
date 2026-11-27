const mongoose = require("mongoose")

/**
 * Interview report schema
 * 
 * jobDescription: String
 * resumeText:  String
 * selfDescription: String
 * matchScore: Number
 * 
 * technicalQuestions: [{
 *     question: String, 
 *     intention: String,
 *     answer: String
 * }]
 * 
 * behvioralQuestions: [{
 *     question: String, 
 *     intention: String,
 *     answer: String
 * }]
 * 
 * skillGaps: [{
 *    skill: "",
 *    severity: "",
 *    type: String,
 *    enum: ["low", "medium", "high"]
 * }]
 * 
 * preparationPlan: [{
 *    day: Number,
 *    focus: String,
 *    tasks: [String]
 * }]
 * 
 * _id: false, no need for id to be generated for techincal questions, etc
 */


// sub scehmas to be embedded inside interviewReportSchema
const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, {_id: false})

const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, {_id: false})

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required"]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "Severity is required"]
    },
    type: {
        type: String
    }
}, {_id: false})

const preparationPlanSchemna = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day is required"]
    },
    focus: {
        type: String,
        required: [true, "Focus is required"]
    },
    tasks: {
        type: [String],
        required: [true, "Tasks are required"]
    }
}, {_id: false})

// main schema
const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true ,"Job description is required"]
    },
    resume: {
        type: String
    },
    selfDescription: {
        type: String
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
    },
    technicalQuestions: [technicalQuestionSchema],
    behaviorlQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchemna],
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    title: {
        type: String,
        required: [true, "Job title is required"]
    }
}, {
    timestamps: true
})

// interview report model
const interviewReportModel = mongoose.model(
    "InterviewReport",
    interviewReportSchema
);

module.exports = interviewReportModel;

