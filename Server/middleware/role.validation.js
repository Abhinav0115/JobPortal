import asyncHandler from "../service/asyncHandler.js";

export const authorize = (...requiredRoles) => asyncHandler(async(req,res,next) => {
    if(!requiredRoles.includes(req.user.role)){
    return res.status(401).json({ success: false, message: 'You are not unauthorized to access this resource' });
    }
    next();
})