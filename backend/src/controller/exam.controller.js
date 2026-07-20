import { Exam } from "../models/exam.model";
import { asyncHandler } from '../utlis/asyncHandler';

const createExam = asyncHandler(async (req, res) => {
    const { inputExamName, inputDescription, inputSuggestion, inputMcqIds, inputCodingQuestionIds } = req.body;

    const examName = typeof inputExamName === 'string' ? inputExamName.trim() : "";
    const suggestion = typeof inputSuggestion === 'string' ? inputSuggestion.trim() : "";
    const description = typeof inputDescription === 'string' ? inputDescription.trim() : "";

    const mcqQuestion = Array.isArray(inputMcqIds) ? inputMcqIds : [];
    const codingQuestion = Array.isArray(inputCodingQuestionIds) ? inputCodingQuestionIds : [];

    if (examName === "" || description === "") {
        return res.status(422).json({
            success: false,
            message: "Please provide a valid exam name and description"
        });
    }

    try {
        const newExam = await Exam.create({
            examName,
            description,
            suggestion,
            codingQuestion,
            mcqQuestion
        });

        return res.status(201).json({
            success: true,
            message: "Exam created successfully!",
            data: newExam
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
});
