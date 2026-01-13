import { Router } from "express";
import { check, checkSchema } from "express-validator";
import { createUser } from "../controllers/users.controller.js";
import { usersValidators } from "../schema/users.schema.js";
import { validatorHandler } from "../middlewares/validationHandler.js";

const router = Router();

router.post("/", checkSchema(usersValidators), validatorHandler, createUser);

export default router;