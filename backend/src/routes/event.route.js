import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { createLocalEvent } from "../controllers/event.controller.js";

const router = Router();

router.route('/createLocalEvent').post(verifyJwt , createLocalEvent)

export default router;