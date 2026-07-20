import { Router } from "express";
import {verifyAccessToken, adminOnly} from "../middlwares/auth.middleware.js";
import {delayResponse} from '../middlwares/delay.middleware.js';
import {
    createExam,
    getExamById
} from '../controller/exam.controller.js'

const router = Router()

router.route("/addexam").post(verifyAccessToken, adminOnly, createExam);
router.route('/getexam').get(verifyAccessToken, getExamById);

export default router