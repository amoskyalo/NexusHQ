import { Request, Response } from "express";
import { createOrganizationService, getAllMyOrganizations } from "./organizations.service";
import { sendResponse } from "../../shared/utils/response";

export const createOrganization = async (req: Request, res: Response) => {
    const requestData = req.body;
    const userId = req.userId;
    const result = await createOrganizationService({ ...requestData, userId });

    return sendResponse({
        res,
        body: result,
        message: "Organization created successfully",
    });
};

export const getAllMyOrganizationsController = async (req: Request, res: Response) => {
    const userId = req.userId;
    const organizations = await getAllMyOrganizations(userId);

    return sendResponse({
        res,
        body: organizations,
        message: "Organizations retrieved successfully",
    });
};
