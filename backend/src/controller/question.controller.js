import { Question } from "../models/question.model.js";
import { asyncHandler } from "../utlis/asyncHandler.js";

const newQuestion = asyncHandler(async (req,res) => {
    const {title, question,subject, urlId, code } = req.body;
    if ([title, question, subject, urlId, code].some(variable => variable === "")) return res.status(401).json({message: "Give proper input."});

    const questionSet = await Question.create({
        title,
        question,
        subject,
        urlId,
        code
    })

    return res.status(200).json({message:"question added successfully"});
    
})

const cursorPagation = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const subject = req.query.subject || "psp";

    const query = {
        subject: subject
    };

    if (req.query.cursor) {
        query._id = {$lt : req.query.cursor};
    }

    const questions = await Question.find(query)
                            .select('title')
                           .sort({_id: -1})
                           .limit(limit + 1);

    const hasMore =  questions.length > limit;

    if (hasMore)  questions.pop();

    const nextCursor = hasMore ? questions[questions.length - 1]._id : null;

    return  res.json({
            data: questions,
            pagination: {
                nextCursor: nextCursor,
                hasMore: hasMore
            }
        });
})

const getQuestion = asyncHandler(async (req, res) => {
    const searchWord = req.query.q;
    const subject = req.query.subject ;

    if (!searchWord || searchWord.trim() === "" || !subject || subject.trim() === "") {
        return res.status(200).json({
            success: true,
            data: []
        });
    }

    const matchingQuestions = await Question.find({
        title: { $regex: searchWord, $options: 'i' },
        subject: subject
    }).sort({createdAt: -1}).limit(20);
    
    return  res.status(200).json({
                success: true,
                data: matchingQuestions,    
            });
})

const getListOfSubject = asyncHandler(async(req, res) => {
    const uniqueSubjects = await Question.distinct('subject');

    return res.status(200).json({
        success: true,
        data: uniqueSubjects
    })
})

export{
    newQuestion,
    cursorPagation,
    getListOfSubject,
    getQuestion
}