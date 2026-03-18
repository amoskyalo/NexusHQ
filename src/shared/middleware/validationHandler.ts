import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validationHandler = (req: Request, res: Response, next: NextFunction) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
        return res.status(400).json({ errors: results.array(), message: "Invalid data provided" });
    }

    next();
};
