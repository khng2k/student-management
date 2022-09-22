import express from "express";
// Controllers v2
import { userControllers } from "../controllers/user.controller.js";
// MiddleWares v1
import { authToken, authPage } from '../../v1/middlewares/jwtAuth.js'
// MiddleWares v2
import { authScore } from "../middlewares/authScore.js";

const router = express.Router();

router.post(
    '/:id/insert-score/:code', 
    [authToken.verifyToken, authPage(["admin", "teacher"]), authScore.checkUserInsertScore],
    userControllers.InsertScore
);

export default router;