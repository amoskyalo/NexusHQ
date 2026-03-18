import { Router } from "express";
import { createUser, getUsers } from "./employees.controller.js";
import { checkSchema } from "express-validator";
import { createEmployeeValidator } from "./employees.validator.js";
import { validationHandler } from "../../shared/middleware/validationHandler.js";

const router = Router();

router.post("/", checkSchema(createEmployeeValidator), validationHandler, createUser);
router.get("/", getUsers);

export default router;
