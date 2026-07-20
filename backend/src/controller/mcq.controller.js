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

const deleteMCQ = asyncHandler(async(req, res) => {
    const { inputId } = req.body;
    
    if (!inputId || String(inputId).trim() === "") {
        return res.status(422).json({
            success: false,
            message: "Please provide a valid input"
        });
    }

    const id = inputId.trim();

    try {
        const deletedDoc = await MCQ.findByIdAndDelete(id);

        if (!deletedDoc) {
            return res.status(404).json({
                success: false,
                message: "MCQ not found. It might have already been deleted."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Successfully deleted"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: error.message
        });
    }
});

const updateMCQ = asyncHandler(async(req, res) => {
    const { inputId, inputQuestionText, inputExplanation, inputOptions, inputCorrectOptions } = req.body;
    
    if (!inputId || String(inputId).trim() === "") {
        return res.status(422).json({
            success: false,
            message: "Please provide a valid input"
        });
    }

    const id = inputId.trim();

    const updateFields = {};

    if (inputQuestionText !== undefined) {
        updateFields.questionText = typeof inputQuestionText === 'string' ? inputQuestionText.trim() : "";
    }
    if (inputExplanation !== undefined) {
        updateFields.explanation = typeof inputExplanation === 'string' ? inputExplanation.trim() : "";
    }
    if (inputCorrectOptions !== undefined) {
        updateFields.correctOptions = typeof inputCorrectOptions === 'string' ? inputCorrectOptions.trim() : "";
    }
    if (inputOptions !== undefined) {
        updateFields.options = Array.isArray(inputOptions) 
            ? inputOptions.map(opt => typeof opt === 'string' ? opt.trim() : opt) 
            : [];
    }

    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({
            success: false,
            message: "No fields provided to update"
        });
    }

    try {
        const updatedDoc = await MCQ.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedDoc) {
            return res.status(404).json({
                success: false,
                message: "MCQ not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedDoc
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: error.message
        });
    }
});

const showListOfMcq = asyncHandler(async(req, res) => {
    try {
        const mcqs = await MCQ.find({});

        return res.status(200).json({
            success: true,
            message: "List of all MCQs retrieved successfully",
            count: mcqs.length,
            data: mcqs
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
});

const searchMcqByText = asyncHandler(async(req, res) => {
    const { queryText } = req.query;

    if (!queryText || String(queryText).trim() === "") {
        return res.status(422).json({
            success: false,
            message: "Please provide a valid search query"
        });
    }

    const searchPattern = String(queryText).trim();

    try {
        const mcqs = await MCQ.find({
            questionText: { $regex: searchPattern, $options: "i" }
        });

        return res.status(200).json({
            success: true,
            message: "Search completed successfully",
            count: mcqs.length,
            data: mcqs
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
});

export {
    addMCQ,
    deleteMCQ,
    updateMCQ,
    showListOfMcq,
    searchMcqByText
}