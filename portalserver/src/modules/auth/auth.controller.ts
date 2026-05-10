import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../shared/utils/response";
import { createUserService, loginService } from "./auth.service";
import type { UserType } from "./auth.validator";
import { config } from "../../config";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { accessToken } = await loginService(req.body);
        res.cookie("accessToken", accessToken, config.cookieOptions)
            .status(200)
            .json({ success: true, message: "Login successful" });
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
