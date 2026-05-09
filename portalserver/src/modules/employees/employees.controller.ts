import { Request, Response } from "express";
import { sendResponse } from "../../shared/utils/response";
import type { EmployeeType } from "./employees.validator";

export const createUser = (req: Request, res: Response) => {
    sendResponse<EmployeeType>({ res, message: "Employee created successfully", data: req.body });
};

export const getUsers = (req: Request, res: Response) => {
    sendResponse<EmployeeType[]>({
        res,
        message: "Employees retrieved successfull",
        data: [{ firstName: "Amos", lastName: "Kyalo", email: "amoskyalo@gmail.com", phoneNumber: "254794433701" }],
    });
};
