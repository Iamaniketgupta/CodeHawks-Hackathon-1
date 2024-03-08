import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { createTeam, findTeam } from "../controllers/team.controller.js";

const router = Router();

router.route('/createTeam').post(verifyJwt , createTeam);
router.route('/findTeam').post(findTeam);


export default router;
