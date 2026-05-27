import { options } from "../constants";
import { User } from "../models/user.model";
import { asyncHandler } from "../utlis/asyncHandler";
import jwt from "jsonwebtoken";
import { creatRefreshAccessToken } from "../controller/user.controller";

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
                const {accessToken, refreshToken} = creatRefreshAccessToken(user._id); 
    
                req.user = user;
                //set the cookie with fresh token
                res.cookie('accessToken', accessToken, options).cookie("refreshToken", refreshToken, options);
                next();
            } catch (error) {
                return res.status(401).json({ message: "Refresh token invalid. Please login again." });
            }
        }
        res.status(401).json({message: error.name})
    }
})



