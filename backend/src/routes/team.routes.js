import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { createTeam, findTeam ,addMembers , removeMember ,addOneMember} from "../controllers/team.controller.js";

const router = Router();

router.route('/createTeam').post(verifyJwt , createTeam);
router.route('/findTeam').post(findTeam);
router.route('/addMembers/:teamId').post(verifyJwt , addMembers);
router.route('/removeMember/:teamId/:member').post(verifyJwt , removeMember);
router.route('/addOneMembers/:teamId/:member').post(verifyJwt , addOneMember);

export default router;
