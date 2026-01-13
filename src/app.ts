import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import routes from "./routes/routes.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API is running",
        version: "1.0.0",
    });
});

app.use("/api", routes);
app.use(errorHandler);

export default app;
