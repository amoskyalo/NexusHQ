import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./shared/middleware/errorHandler";
import { authMiddleware } from "./shared/middleware/authMiddleware";
import usersRoute from "./modules/employees/employees.route";
import authRoute from "./modules/auth/auth.routes";
import profileRoutes from "./modules/me/me.routes";
import organizationsRoute from "./modules/organizations/organizations.routes";

const app = express();

app.use(
    express.json(),
    cookieParser(),
    cors({
        credentials: true,
        origin: ["http://localhost:3000"],
    }),
);

app.get("/", (_, res) => {
    res.json({
        success: true,
        message: "APP is running",
        version: "1.0.0",
    });
});

app.use("/api/auth", authRoute);
app.use("/api/me", authMiddleware, profileRoutes);
app.use("/api/organizations", authMiddleware, organizationsRoute);
app.use("/api/employees", authMiddleware, usersRoute);

app.use(errorHandler);

export default app;
