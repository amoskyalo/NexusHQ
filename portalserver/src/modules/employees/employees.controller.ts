import { Request, Response } from "express";
import { sendResponse } from "../../shared/utils/response";
import type { EmployeeType } from "./employees.validator";

export const createUser = (req: Request, res: Response) => {
    sendResponse<EmployeeType>({ res, message: "Employee created successfully", body: req.body });
};

export const getUsers = (req: Request, res: Response) => {
    sendResponse<EmployeeType[]>({
        res,
        message: "Employees retrieved successfull",
        body: [{ firstName: "Amos", lastName: "Kyalo", email: "amoskyalo@gmail.com", phoneNumber: "254794433701" }],
    });
};
