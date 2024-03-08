import { Router } from "express";
import { editProfile, exampleFunc, login, logoutUser, signup, toggleFollow } from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { uploadImage } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/example").post(exampleFunc);
router.route('/signup').post(uploadImage.single("avatar"), signup);
router.route('/login').post(login);
router.route('/logout').post(verifyJwt , logoutUser);
router.route('/editProfile').post(verifyJwt , editProfile);
router.route('/toggleFollow/:userId').post(verifyJwt , toggleFollow);

export default router;

// 65eb4142a94de02309c88b8f