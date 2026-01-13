import { Response } from "express";

type SendResponseArg = {
    res: Response;
    message: string;
    status?: number;
    data?: any;
};

export const sendResponse = ({ res, status = 200, message, data }: SendResponseArg) => {
    res.status(status).json({ success: true, message, data });
};
