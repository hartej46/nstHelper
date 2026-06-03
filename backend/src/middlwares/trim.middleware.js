import { asyncHandler } from "../utlis/asyncHandler.js";

export const trimInput = asyncHandler(async(req,_,next) => {
        if (req.body) {
            for (const key in req.body) {
                if (typeof req.body[key] === 'string') {
                    req.body[key] = req.body[key].trim();
                }
            }
        }

        next();
});