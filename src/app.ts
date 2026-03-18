import express from "express";
import { errorHandler } from "./shared/middleware/errorHandler.js";
import usersRoute from "./modules/employees/employees.route.js";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
    res.json({
        success: true,
        message: "APP is running",
        version: "1.0.0",
    });
});

app.use("/api/employees", usersRoute);

app.use(errorHandler);

export default app;
