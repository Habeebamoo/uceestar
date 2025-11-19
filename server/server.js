import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import { RequireApiKey } from "./middlewares/apiKey.js";
import authRouter from "./Routes/authRouter.js"

const app = express();
dotenv.config();

connectDB();

//middlewares
app.use(cors())
app.use(cookieParser)
app.use(RequireApiKey)

//routes
app.use("/api/auth", authRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`)
})