import mongoose, {Schema} from "mongoose";

const questionSchema = new Schema(
    {   
        title : {
            type: String,
            required: true,
        },
        question : {
            type : String,
            required : true,
        },
        subject: {
            type: String,
            required: true
        },
        language: {
            type: String,
            required: true,
            lowercase: true
        },
        urlId : {
            type : String,
            required: true,
            lowercase: true
        },
        code : {
            type : String,
            required : true
        }
    },
    {
        timestamps: true
    }
);

export const Question = mongoose.model("Question", questionSchema);