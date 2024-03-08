import { Router } from "express";
import { exampleFunc } from "../controllers/user.controller";

const router = Router();

router.route("/example").post(exampleFunc);

export default router;