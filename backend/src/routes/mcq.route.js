import { Router } from "express";
import {verifyAccessToken, adminOnly} from "../middlwares/auth.middleware.js";
import {delayResponse} from '../middlwares/delay.middleware.js';
import {
    addMCQ,
    deleteMCQ,
    updateMCQ,
    showListOfMcq,
    searchMcqByText
} from '../controller/mcq.controller.js';

const router = Router();

router.route('/mcq/add').post(verifyAccessToken, adminOnly, addMCQ);
router.route('/mcq/delete').delete(verifyAccessToken, adminOnly, deleteMCQ);
router.route('/mcq/update').put(verifyAccessToken, adminOnly, updateMCQ);
router.route('/mcq/showlist').get(verifyAccessToken, showListOfMcq);
router.route('/mcq/search').get(verifyAccessToken, searchMcqByText);

export default router