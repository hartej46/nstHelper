import mongoose, { Schema } from "mongoose";

const mcqSchema = new Schema(
    {
        questionText: {
            type: String,
            required: true,
        },
        options: {
            type: [String],
            required: true
        },
        correctOptions: {
            type: String,
            required:true
        },
        explanation: { 
            type: String
        },

    },
    {
        timestamps: true
    }
)

export const MCQ = mongoose.model("MCQ", mcqSchema);