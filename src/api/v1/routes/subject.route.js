import express from "express";
// Controllers
import { subjectController } from "../controllers/subject.controller.js";
// Middlewares
import { authSubject } from "../middlewares/authSubject.js";
import { authToken, authPage } from "../middlewares/jwtAuth.js";

const router = express.Router();

router.post('/insert-class', authSubject.checkCreateSubject, [authToken.verifyToken, authPage(['admin'])], subjectController.createSubject);

export default router;