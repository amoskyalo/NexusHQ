import { prisma } from "../../shared/utils/prisma";
import type { User } from "../../generated/prisma/client";
import { AppError } from "../../shared/utils/AppError";
import { comparePassword, hashPassword } from "../../shared/utils/Bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config";

export const createUserService = async (data: User) => {
    const { password, ...rest } = data;

    const hashedPassword = await hashPassword(password);

    return prisma.user.create({
        data: {
            ...rest,
            password: hashedPassword,
        },
        omit: {
            password: true,
        },
        include: {
            organizations: true,
        },
    });
};

export const loginService = async (data: Pick<User, "email" | "password">) => {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
        include: {
            organizations: true,
        },
    });

    if (!user) {
        throw new AppError("User not found", 404);
    }

    const { role, organizations, password: userPassword } = user;
    const comparePasswordResults = await comparePassword(password, userPassword);

    if (!comparePasswordResults) {
        throw new AppError("Username or password is incorrect", 401);
    }

    const accessToken = jwt.sign({ userId: user.id, role: user.role }, config.jwtSecret, { expiresIn: "30m" });

    return { accessToken, role, organizations };
};
