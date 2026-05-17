import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import jwt from "jsonwebtoken";
import { config } from "../../config";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.accessToken;
        
        if (!token) {
            throw new AppError("Unauthorized", 401);
        }

        const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };
        req.userId = decoded.userId;

        next();
    } catch (error: any) {
        if (error.name === "JsonWebTokenError") {
            throw new AppError("Invalid token provided", 401);
        }

        if (error.name === "TokenExpiredError") {
            throw new AppError("Expired token provided", 401);
        }

        throw new AppError("Invalid token provided", 401);
    }
};
