import { Request, Response } from "express";
import { sendResponse } from "../../shared/utils/response.js";

export const createUser = (req: Request, res: Response) => {
    sendResponse({ res, message: "Employee created successfully", data: req.body });
};

export const getUsers = (req: Request, res: Response) => {
    sendResponse({
        res,
        message: "Employees retrieved successfully",
        data: [{ firstName: "Amos", lastName: "Kyalo", email: "amoskyalo@gmail.com", phoneNumber: "254794433701" }],
    });
};
