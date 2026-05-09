import { Router } from "express";
import { getProfile } from "./me.controller";
import { validationHandler } from "../../shared/middleware/validationHandler";

const router = Router();

router.get("/", getProfile);

export default router;
