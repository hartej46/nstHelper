import { asyncHandler}  from "../utlis/asyncHandler.js"; 

export const checkHealth = asyncHandler(async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Server is running smoothly!",
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});