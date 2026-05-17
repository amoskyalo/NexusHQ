import { Router } from "express";
import { validationHandler } from "../../shared/middleware/validationHandler";
import { createOrganizationValidator } from "./organizations.validator";
import { createOrganization } from "./organizations.controller";
import { getAllMyOrganizationsController } from "./organizations.controller";

const router = Router();

router.get("/", getAllMyOrganizationsController);
router.post("/create", validationHandler(createOrganizationValidator), createOrganization);

export default router;
