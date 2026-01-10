import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import { RequireApiKey } from "./middlewares/apiKey.js";
import { verifyUser } from "./middlewares/verifyUser.js";
import authRouter from "./Routes/authRouter.js"
import userRouter from "./Routes/userRouter.js"
import productRouter from "./Routes/productRouter.js";
import orderRouter from "./Routes/orderRouter.js";
import adminRouter from "./Routes/adminRouter.js";

const app = express();
dotenv.config();

//middlewares
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))
app.use(cookieParser())
app.use(RequireApiKey)

//health
app.get("/api/status", (req, res) => {
  return res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "System is up and running"
  })
})

//routes
app.use("/api/auth", express.json(), authRouter)
app.use("/api/user", express.json(), verifyUser, userRouter)
app.use("/api/products", productRouter)
app.use("/api/order", express.json(), verifyUser, orderRouter)
app.use("/api/admin", express.json(), adminRouter)

const PORT = process.env.PORT || 5000;

const startApp = async () => {
  try {
    await connectDB()

    app.listen(PORT, () => {
      console.log(`Server Running On Port ${PORT}`)
    })
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
}

startApp()