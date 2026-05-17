import { prisma } from "../../shared/utils/prisma";
import { OrganizationType } from "./organizations.validator";

export const createOrganizationService = async (data: OrganizationType & { userId: string }) => {
    return prisma.organizations.create({
        data: {
            ...data,
            userId: data.userId,
        },
    });
};

export const getAllMyOrganizations = async (userId: string) => {
    return prisma.organizations.findMany({
        where: {
            userId,
        },
    });
};
