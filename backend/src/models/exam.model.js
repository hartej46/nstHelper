import mongoose, { Schema } from "mongoose";

const examSchema = new Schema(
    {
        examName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        suggestion: {
            type: String,
        },
        codingQuestion: [
            {
                type: Schema.Types.ObjectId,
                ref: "Question" 
            }
        ],
        mcqQuestion: [
            {
                type: Schema.Types.ObjectId,
                ref: "MCQ"
            }
        ]

    },
    {
        timestamps: true
    }
)

export const Exam = mongoose.model("Exam", examSchema);