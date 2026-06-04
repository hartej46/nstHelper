import { Question } from "../models/question.model.js";
import { asyncHandler } from "../utlis/asyncHandler.js";

const newQuestion = asyncHandler(async (req,res) => {
    const {title,language, question,subject, urlId, code } = req.body;
    if ([title, question, subject,language, urlId, code].some(variable => variable === "")) return res.status(401).json({message: "Give proper input."});

    const questionSet = await Question.create({
        title,
        question,
        subject,
        urlId,
        code,
        language
    })

    return res.status(200).json({message:"question added successfully"});
    
})


const cursorPagination = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const subject = req.query.subject || "psp";
    const search = req.query.search || "";

    const query = { subject: subject };


    if (search.trim() !== "") {
        query.title = { $regex: search, $options: 'i' };
    }

    if (req.query.cursor) {
        query._id = { $lt: req.query.cursor };
    }

    const questions = await Question.find(query)
                            .select('title urlId subject')
                            .sort({ _id: -1 })
                            .limit(limit + 1);

    const hasMore = questions.length > limit;
    if (hasMore) questions.pop();

    const nextCursor = hasMore ? questions[questions.length - 1]._id : null;

    return res.json({
        success: true,
        data: questions,
        pagination: {
            nextCursor: nextCursor,
            hasMore: hasMore
        }
    });
});

const getListOfSubject = asyncHandler(async(req, res) => {
    const uniqueSubjects = await Question.distinct('subject');

    return res.status(200).json({
        success: true,
        data: uniqueSubjects
    })
})

const questionDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id)
    if (!id || !id.trim()) return res.status(404).json({
                            success: false,
                            message:"No question found"
                        });

    const matchingQuestion = await Question.find({
        urlId: { $regex: id, $options: 'i' }
    })
    
    return  res.status(200).json({
                success: true,
                data: matchingQuestion,    
            });
})

export{
    newQuestion,
    cursorPagination,
    getListOfSubject,
    questionDetail
}