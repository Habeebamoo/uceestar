import express from "express";
import { SignIn } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signin", SignIn)

export default authRouter;