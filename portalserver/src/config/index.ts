import dotenv from "dotenv";
import { CookieOptions } from "express";
dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    connectionString: process.env.DATABASE_URL!,
    jwtSecret: process.env.JWT_SECRET!,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
    } as CookieOptions,
};
