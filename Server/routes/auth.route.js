import { forgetPassword, login, register } from "../controllers/auth.controller.js";
import { Router } from "express";

const router = Router();

router.post('/register',register)
router.post('/login',login);
router.post('/forgetPassword',forgetPassword)

export default router