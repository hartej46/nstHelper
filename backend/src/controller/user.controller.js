import { User } from "../models/user.model.js";
import { asyncHandler } from "../utlis/asyncHandler.js";

import jwt from "jsonwebtoken";
import { emailSend } from "../utlis/emailService.js";
import { options } from "../constants.js";


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

const changePassword = async (_id, password) => {
    const user = await User.findById(_id);

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) return res.status(400).json({message: "Please enter correct password"});

    user.password = password;
    await user.save()
    return true
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

const verifyOtp = asyncHandler(async (req, res) => {
    const { email, otpCode } = req.body;

    if (!email || !otpCode || email.trim() === "" || otpCode.toString().trim() === "") {
        return res.status(400).json({ message: "Give correct input" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(400).json({ message: "No user found" });
    }
    
    if (otpCode.toString().trim() === user.tempOtp?.toString() && new Date() < user.otpExpiry) {
        user.isVerified = true;
        
        const { accessToken, refreshToken } = await creatRefreshAccessToken(user._id);
        user.refreshToken = refreshToken;
        await user.save();

        return res.status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .json({
                    message: "User registered successfully.",
                    accessToken,
                    user: {
                        username: user.username,
                        email: user.email
                    }
                });
    }

    return res.status(400).json({ message: "The OTP entered is incorrect or has expired. Please try again." });
});

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    const otpCode = Math.floor(Math.random() * (999999-100000 + 1)) + 100000;

    if (
        [email, username, password].some((field) => field?.trim() === "")
    ) {
        return res.status(400).json({message: "All fields are required"})
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser){
        if (existedUser.isVerified) {
            return res.status(400).json({ message: "Email is already registered. Please log in." });
        }

        if(existedUser.otpCount > 5 && existedUser.otpWindow >= Date.now()) return res.status(401).json({messgae:"Too many otp attempt"});

        if(existedUser.otpWindow < Date.now()) {
            existedUser.otpCount = 0;
            existedUser.otpWindow = Date.now() + (24*60*60*1000);
        }
        
        existedUser.otpExpiry = new Date(Date.now() + (10 * 60 * 1000)); 
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
        existedUser.otpCount++ ;
        await existedUser.save();


        return res.status(200).json({ 
            success: true, 
            message: "OTP sent successfully! Please check your inbox." 
        });

    }

    let role = 'user'

    if (email === process.env.ADMIN_EMAIL) {
       role = "admin"
    };

    const otpExpiry = new Date(Date.now() + (5 * 60 * 1000)); 

    const user = await User.create({
        username,
        email,
        role,
        password,
        tempOtp: otpCode,
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

const loginUser = asyncHandler(async (req, res) => {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password?.trim().toLowerCase();

    if (!email || !password) return res.status(400).json({message: "Please give me correct details"});
    const user = await User.findOne({email});
    if (!user) return res.status(404).json({message: "No user found"});

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) return res.status(403).json({message: "Icorrect password"});

    const {accessToken, refreshToken} = await creatRefreshAccessToken(user._id);
    return  res.cookie("accessToken", accessToken, options)
               .cookie("refreshToken", refreshToken, options)
               .status(200)
               .json({messgae: "User Logged In."})
})

const logoutUser = asyncHandler(async (req, res) => {
    // we get id from req coz we checked in middleware
    await User.findOneAndUpdate(
        {_id: req.user._id},
        {
            $unset:{
                refreshToken: 46
            }
        }
    )

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({message:"User logged out successfully"});
})

const forgotPassword = asyncHandler(async(req, res) => {
    const {email} = req.body;
    if (!email) return res.status(400).json({message:"User not found"});

    const user = await User.findOne({email});
    if (!user) return res.status(400).json({message:"User not found"});

    const otpExpiry = new Date(Date.now() + (5 * 60 * 1000)); 
    const otpCode = Math.floor(Math.random() * (999999-100000 + 1)) + 100000;
    user.otpExpiry = otpExpiry;
    user.tempOtp = otpCode;
    await user.save()
    const isEmailSent = await sendEmail(user.email, otpCode);

    if (!isEmailSent) return res.status(500).json({message:"Couldnt send OTP"});

    return res.status(200).json({message:"OTP sent successfully"});
    
})

const resetPassword = asyncHandler(async (req, res) => {
    const {oldPassword, newPassword} = req.body;
    const accessToken = req.cookies("accessToken");

    if (!oldPassword || !newPassword) return res.status(400).json({message:"Give proper input"});

    const decodeToken = jwt.decode(accessToken , process.env.ACCESS_TOKEN_GENERATOR);
    const user = await User.findById(decodeToken._id);
    if (!user) return res.status(404).json({message:"No user found"});

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordCorrect) return res.status(401).json({message:"Incorrect Password"});

    user.password = newPassword;
    await user.save();

    return res.status(200).json({message:"Password changed successfully"});

})

const resendOtp = asyncHandler(async(req, res) => {
    const {email} = req.body;
    if (!email) return res.status(401).json({message: "Please give proper email"});

    const user = await User.findOne({email});
    if (!user) return res.status(404).json({message: "No user found"});

    if (user.otpCount > 5 && user.otpWindow > Date.now()) return res.status(401).json({message:"cannot send OTP, crossed limit"});

    if(user.otpWindow < Date.now()) {
        user.otpCount = 0;
        user.otpWindow = Date.now() + (24*60*60*1000);
    }

    const otpCode = Math.floor(Math.random() * (999999-100000 + 1)) + 100000;
    const otpExpiry = new Date(Date.now() + (5 * 60 * 1000)); 
    user.tempOtp = otpCode;
    user.otpExpiry = otpExpiry;
    await user.save();
    const isEmailSent = sendEmail(user.email, otpCode);

    if (!isEmailSent) return res.status(500).json({message:"Something went wrong internally"});
    user.otpCount++;
    await user.save();
    return res.json({message:"OTP sent successfully"})
})

const userData = asyncHandler( async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "User is logged in",
        data: req.user
    });
    
})

export {
    verifyOtp,
    registerUser,
    creatRefreshAccessToken,
    forgotPassword,
    logoutUser,
    loginUser,
    resetPassword,
    resendOtp,
    userData
}