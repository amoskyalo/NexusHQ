import dotenv from "dotenv";
dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    connectionString: process.env.DATABASE_URL!,
    jwtSecret: process.env.JWT_SECRET!,
};
