import { Request, Response, NextFunction } from "express";
import { Prisma } from "../../generated/prisma/client";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = (err as any).statusCode || 500;
    const message = err.message || "Internal server error";
    const isOperational = (err as any).isOperational || false;

    if(err instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(err.code);
    }

    if (!isOperational) {
        console.error(err);
    }

    res.status(statusCode).json({ success: false, message });
};

