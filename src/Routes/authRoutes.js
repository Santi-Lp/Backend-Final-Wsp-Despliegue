import express from "express";
import { login, register, verifyEmailValidationTokenController } from "../controllers/authController.js";
import { authenticate, verifyApikeyMiddleware } from "../middlewares/authMiddleware.js";
import { validateLogin, validateRegister } from "../middlewares/validation.middleware.js";
import { getProfile } from "../controllers/user.controller.js";

const authRouter = express.Router();

authRouter.post("/register",validateRegister, register);
authRouter.get("/verify/:verificationToken", verifyEmailValidationTokenController);
authRouter.post("/login", validateLogin ,login);
authRouter.get("/me", authenticate, getProfile);

export default authRouter