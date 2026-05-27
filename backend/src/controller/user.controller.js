import { User } from "../models/user.model";
import { asyncHandler } from "../utlis/asyncHandler";
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";

const creatRefreshAccessToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        
        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error(error)
    }
}

export default creatRefreshAccessToken;

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const otp = Math.floor(Math.random() * (999999-100000 + 1)) + 100000

    

})

