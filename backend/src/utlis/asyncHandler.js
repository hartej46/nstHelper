export const asyncHandler = (fn) => async (req, res, next) => {
    try {
        return await fn(req, res, next);
    } catch (error) {
        console.error("Crashed", error);

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Something went wrong internally."
        });
    }
};