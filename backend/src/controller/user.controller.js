import { User } from "../models/user.model";
import { asyncHandler } from "../utlis/asyncHandler";
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import { emailSend } from "../utlis/emailService";
import { options } from "../constants";

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

const sendEmail = async (to, otpCode) => {
    try {
        const info = await emailSend(to, otpCode);
        
        if (!info || !info.accepted || info.accepted.length === 0) {
            return false;
        }
        return true; 
    } catch (error) {
        console.error("Email service error:", error);
        return false;
    }
};

const verifyOtp = asyncHandler ( async (req, res) => {
    const {email, otpCode} = req.body;

    if ([email, otpCode].some(val => val.trim() === "")) return res.status(400).json({message: "Give coreect input"});

    const user = await User.findOne({email: email})

    if (!user) return res.status(400).json({message: "No user found"});
    
    if (otpCode.toString().trim() === user.tempOtp.toString() && new Date(Date.now()) < user.otpExpiry) {
        user.isVerified = true;
        const {accessToken, refreshToken} = await creatRefreshAccessToken(user._id);
        user.refreshToken = refreshToken;

        await user.save();
        return  res.status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .json({
                    message: "User registerd successfully.",
                    accessToken,
                    user: {
                        username: user.username,
                        email: user.email
                    }
                })
    }

    return res.status(400).json({message: "The OTP entered is incorrect or has expired. Please try again."});
    
} );

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    const otpCode = Math.floor(Math.random() * (999999-100000 + 1)) + 100000;

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser){
        if (existedUser.isVerified) {
            return res.status(400).json({ message: "Email is already registered. Please log in." });
        }

        
        existedUser.otpExpiry = new Date(Date.now() + (5 * 60 * 1000)); 
        existedUser.username = username;
        existedUser.email = email;
        existedUser.password = password;
        existedUser.tempOtp = otpCode;

        await existedUser.save();

        const isEmailSent = await sendEmail(email, otpCode);

        if (!isEmailSent) {
            return res.status(500).json({ 
                success: false, 
                message: "Failed to send OTP email. Please try again later." 
            });
        }
        return res.status(200).json({ 
            success: true, 
            message: "OTP sent successfully! Please check your inbox." 
        });

    }

    let role = 'user'

    if (email === process.env.ADMIN_EMAIL) {
       role = "admin"
    };

    otpExpiry = new Date(Date.now() + (5 * 60 * 1000)); 

    const user = await User.create({
        username,
        email,
        role,
        password,
        tempOtp,
        otpExpiry,
        
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        return res.status(500).json({message : "Something went wrong while registering the user"})
    }

    const isEmailSent = await sendEmail(email, otpCode);

    if (!isEmailSent) {
        return res.status(500).json({ 
            success: false, 
            message: "Failed to send OTP email. Please try again later." 
        });
    }
    return res.status(200).json({ 
        success: true, 
        message: "OTP sent successfully! Please check your inbox." 
    });

})

export {
    verifyOtp,
    registerUser,
    creatRefreshAccessToken
}