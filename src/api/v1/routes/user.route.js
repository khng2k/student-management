import express from "express";
// Controllers
import { userControllers } from "../controllers/user.controller.js";
import { authUser } from "../middlewares/authUser.js";

const router = express.Router();

router.post('/signIn', [authUser.checkSignIn], userControllers.logInUser);

router.post('/student/signUp', [authUser.checkRegisStudent], userControllers.RegisStudent);

export default router;