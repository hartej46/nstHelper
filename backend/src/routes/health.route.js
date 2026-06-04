import { Router } from "express";
import { checkHealth } from "../controller/health.controller.js";

const router = Router();
router.route("/").get(checkHealth);

export default router;