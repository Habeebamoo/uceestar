import express from "express";
import { signIn } from "../controllers/adminController.js"

const adminRouter = express();

adminRouter.post("/signin", signIn)

export default adminRouter