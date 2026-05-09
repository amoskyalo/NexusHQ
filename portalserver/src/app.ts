import express from "express";
import { errorHandler } from "./shared/middleware/errorHandler";
import { authMiddleware } from "./shared/middleware/authMiddleware";
import usersRoute from "./modules/employees/employees.route";
import authRoute from "./modules/auth/auth.routes";
import profileRoutes from "./modules/me/me.routes";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
    res.json({
        success: true,
        message: "APP is running",
        version: "1.0.0",
    });
});

app.use("/api/auth", authRoute);
app.use("/api/me", authMiddleware, profileRoutes);
app.use("/api/employees", authMiddleware, usersRoute);

app.use(errorHandler);

export default app;
