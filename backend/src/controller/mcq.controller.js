import { MCQ } from "../models/mcq.model";
import { asyncHandler } from '../utlis/asyncHandler'

const addMCQ = asyncHandler(async(req, res) => {
    const { inputQuestionText, inputExplanation, inputOptions, inputCorrectOptions } = req.body;
    const [questionText, explanation, correctOptions] = [inputQuestionText, inputExplanation, inputCorrectOptions]
                                            .map(item => typeof(item) == 'string' ? item.trim() : "");

    const options = Array.isArray(inputOptions) 
        ? inputOptions.map(opt => typeof opt === 'string' ? opt.trim() : opt) 
        : [];

    correctInput = [questionText, explanation, correctOptions].every(item => item != "") && options.length >= 2;

    if (!correctInput) return res.status(422).json({
        success: false,
        message: "Incorrect input. Please enter a valid input"
    });

    try {
        const newMcqAdded = await MCQ.create({
            questionText,
            explanation,
            options,
            correctOptions
        });

        return res.status(201).json({
            success: true,
            message: "MCQ created successfully!",
            data: newMcqAdded
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Failed to create MCQ. Please check your inputs.",
            error: error.message
        });
    }
})