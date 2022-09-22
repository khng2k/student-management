import express from "express";
// Controllers
import { classController } from "../controllers/class.controller.js";
// Middlewares
import { authClass } from "../middlewares/authClass.js";
import { authToken, authPage } from "../middlewares/jwtAuth.js";

const router = express.Router();

router.post('/insert-class', authClass.checkCreateClass, [authToken.verifyToken, authPage(['admin'])], classController.createClass);

export default router;