import { AppError } from "../../shared/utils/AppError";
import { prisma } from "../../shared/utils/prisma";

export const getUserProfileService = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        omit: {
            password: true,
        },
    });

    if (!user) {
        throw new AppError("User account not found", 404);
    }

    const { firstName, lastName, ...rest } = user;
    const displayName = `${firstName} ${lastName}`;

    return {
        ...rest,
        firstName,
        lastName,
        displayName,
    };
};
