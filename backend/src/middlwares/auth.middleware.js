import { options } from "../constants.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utlis/asyncHandler.js";
import jwt from "jsonwebtoken";
import { creatRefreshAccessToken } from "../controller/user.controller.js";

export const verifyAccessToken = asyncHandler (async (req, res,next) => {
    try {
        const token = req.cookies.accessToken;
    
        if (!token) return res.status(401).json({message:"Invalid token"});
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_GENERATOR);
        const user = await User.findById(decodeToken._id);

        if (!user) return res.status(400).json({message: "Unauthorized access"});

        req.user = user;
        return next();

    } catch (error) {           /* if accessToken expired in 15 min this is catch methods catch the verify failure and continues, so user 
        expreicence doesnt break or user feel friction */
        const rToken = req.cookies.refreshToken;                 
        if (error.name === "TokenExpiredError" && rToken) {
            try {
                const decodedRefreshToken = jwt.verify(rToken, process.env.REFRESH_TOKEN_GENERATOR);
                const user = await User.findById(decodedRefreshToken._id);
    
                if (!user)  return res.status(400).json({message: "Unauthorized access"});
                
                // creating accessToken with refreshToken so that the 20d period resets again to 20d
                const {accessToken, refreshToken} = await creatRefreshAccessToken(user._id); 
    
                req.user = user;
                //set the cookie with fresh token
                res.cookie('accessToken', accessToken, options).cookie("refreshToken", refreshToken, options);
                next();
            } catch (error) {
                return res.status(401).json({ message: "Refresh token invalid. Please login again." });
            }
        }
      return res.status(401).json({ 
            success: false,
            message: error.message || "Unauthorized access. Invalid or missing token." 
        });
    }
})

export const adminOnly = asyncHandler ( async (req, res, next) => {
    if (req.user.role === "admin" && req.user.email === process.env.ADMIN_EMAIL) return next();
    
    return res.status(403).json({message: "Forbbiden access, please use authorized email"})
    
})

export const redirectIfLoggedIn = asyncHandler(async (req, res, next) => {
    const token = req.cookies.accessToken;
    const rToken = req.cookies.refreshToken;
    // console.log(token)
    if (!token && !rToken) {
        return next();
    }

    try {
        if (token) {
            jwt.verify(token, process.env.ACCESS_TOKEN_GENERATOR);
            return res.status(200).json({
                success: true,
                isLoggedIn: true,
                redirectTo: "/dashboard",
                message: "User already logged in. Redirecting..."
            });
        }
    } catch (error) {
        if (error.name === "TokenExpiredError" && rToken) {
            try {
                const decodedRefreshToken = jwt.verify(rToken, process.env.REFRESH_TOKEN_GENERATOR);
                const user = await User.findById(decodedRefreshToken._id);

                const {accessToken, refreshToken} = await creatRefreshAccessToken(user._id); 
                return res.status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .json({
                    success: true,
                    isLoggedIn: true,
                    redirectTo: "/dashboard",
                    message: "Session still active. Redirecting..."
                });
            } catch (refreshError) {
                return next();
            }
        }
    }
    return next();
});