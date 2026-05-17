import { Request, Response, NextFunction } from "express";
import { ZodSafeParseResult, ZodType } from "zod";

export const validationHandler = (schema: ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const results: ZodSafeParseResult<any> = schema.safeParse(req);

        if (!results.success) {
            return res.status(400).json({ errors: results.error.issues, message: "Invalid data provided" });
        }

        req.body = results.data.body;
        req.params = results.data.params;

        next();
    };
};
