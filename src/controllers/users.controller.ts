import { Request, Response } from "express";
import { sendResponse } from "../utils/response.js";

export const createUser = (req: Request, res: Response) => {
    //TODO: call service
    sendResponse({ res, message: "User created successfully", data: req.body });
};
