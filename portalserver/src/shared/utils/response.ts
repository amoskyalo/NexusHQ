import { Response } from "express";

type SendResponseArg<T> = {
    res: Response;
    message: string;
    status?: number;
    body?: T;
};

export const sendResponse = <T>({ res, status = 200, message, body }: SendResponseArg<T>) => {
    res.status(status).json({ success: true, message, body });
};
