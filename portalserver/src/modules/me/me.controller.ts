import { Request, Response } from "express";
import { sendResponse } from "../../shared/utils/response";
import { getUserProfileService } from "./me.service";

export const getProfile = async (req: Request, res: Response) => {
    const userId = req.userId;
    const userProfile = await getUserProfileService(userId);

    sendResponse({
        res,
        status: 200,
        message: "Profile retrieved successfully",
        body: userProfile,
    });
};
