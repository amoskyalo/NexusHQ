import { Response } from "express";

type SendResponseArg<T> = {
    res: Response;
    message: string;
    status?: number;
    data?: T;
};

export const sendResponse = <T>({ res, status = 200, message, data }: SendResponseArg<T>) => {
    res.status(status).json({ success: true, message, data });
};
