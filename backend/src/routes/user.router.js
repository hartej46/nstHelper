import {
    verifyOtp,
    registerUser,
    forgotPassword,
    logoutUser,
    loginUser,
    resetPassword,
    resendOtp,
    userData
} from '../controller/user.controller.js';

import {trimInput} from "../middlwares/trim.middleware.js";
import {Router} from "express";
import {verifyAccessToken, redirectIfLoggedIn} from "../middlwares/auth.middleware.js";

const router = Router()

router.route('/register').post(redirectIfLoggedIn, registerUser);
router.route("/login").post(redirectIfLoggedIn,loginUser);
router.route("/logout").post(verifyAccessToken, logoutUser);
router.route("/forgot-password").post(redirectIfLoggedIn, trimInput, forgotPassword);
router.route("reset-password").post(verifyAccessToken, trimInput, resetPassword);
router.route("/verify").post(trimInput, redirectIfLoggedIn, verifyOtp);
router.route("/resend").post(trimInput, redirectIfLoggedIn,resendOtp);
router.route("/me").get(verifyAccessToken,userData);


export default router;