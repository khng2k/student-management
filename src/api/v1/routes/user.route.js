import express from "express";
// Controllers
import { userControllers } from "../controllers/user.controller.js";
// MiddleWares
import { authUser } from "../middlewares/authUser.js";
import { authToken, authPage } from "../middlewares/jwtAuth.js";

const router = express.Router();

router.post('/signIn', authUser.checkSignIn, userControllers.logInUser);

router.post('/student/signUp', authUser.checkRegisStudent, [authToken.verifyToken, authPage(['admin', 'teacher'])], userControllers.RegisStudent);

export default router;