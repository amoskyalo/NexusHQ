import { Request, Response, NextFunction } from "express";
import { Prisma } from "../../generated/prisma/client";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = (err as any).statusCode || 500;
    const message = err.message || "Internal server error";
    const isOperational = (err as any).isOperational || false;

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const errorCode = err.code;

        if (errorCode == "P2002") {
            const modelName = err.meta?.modelName as string;
            const raw = (err.meta?.driverAdapterError as any)?.cause?.constraint?.fields?.[0];
            const constraint = raw?.replace(/"/g, "") ?? "field";
            return res
                .status(400)
                .json({ success: false, message: `${modelName} with this ${constraint} already exists` });
        }

        return res.status(500).json({ success: false, message: "Internal server error" });
    }

    if (err instanceof Prisma.PrismaClientValidationError) {
        console.log(err.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }


    if (!isOperational) {
        // console.error(err);
    }

    return res.status(statusCode).json({ success: false, message });
};
