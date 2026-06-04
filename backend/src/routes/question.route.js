import { Router } from "express";
import {verifyAccessToken, adminOnly} from "../middlwares/auth.middleware.js";
import {delayResponse} from '../middlwares/delay.middleware.js'
import {
    newQuestion,
    cursorPagination,
    getListOfSubject,
    questionDetail
} from "../controller/question.controller.js"
import { trimInput } from "../middlwares/trim.middleware.js";

const router = Router();

router.route('/addquestion').post(verifyAccessToken, adminOnly, trimInput, newQuestion);
router.route('/').get(verifyAccessToken,delayResponse(),trimInput, cursorPagination);
router.route("/subject").get(delayResponse(),getListOfSubject);
router.route("/:id").get(verifyAccessToken,delayResponse(), questionDetail);

export default router;