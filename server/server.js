import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import { RequireApiKey } from "./middlewares/apiKey.js";
import { verifyUser } from "./middlewares/verifyUser.js"
import authRouter from "./Routes/authRouter.js"
import userRouter from "./Routes/userRouter.js"

const app = express();
dotenv.config();

connectDB();

//middlewares
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(RequireApiKey)

//routes
app.get("/api/status", (req, res) => {
  return res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "System is up and running"
  })
})

app.use("/api/auth", authRouter)
app.use("/api/user", verifyUser, userRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`)
})