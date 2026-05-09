import { Router } from "express";
import { createUser, getUsers } from "./employees.controller";
import { createEmployeeValidator } from "./employees.validator";
import { validationHandler } from "../../shared/middleware/validationHandler";

const router = Router();

router.post("/", validationHandler(createEmployeeValidator), createUser);
router.get("/", getUsers);

export default router;
