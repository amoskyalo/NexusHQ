import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../shared/utils/response";
import { createUserService, loginService } from "./auth.service";
import type { UserType } from "./auth.validator";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await loginService(req.body);
        sendResponse({ res, message: "Login successful", data: user });
    } catch (error) {
        next(error);
    }
};

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const user = await createUserService(data);
        sendResponse<Omit<UserType, "password">>({ res, message: "Signup successful", data: user });
    } catch (error) {
        next(error);
    }
};
