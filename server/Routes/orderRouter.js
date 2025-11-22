import express from "express";
import { getOrders, initializePayment, verifyPayment } from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.get("/", getOrders)
orderRouter.post("/payment/initialize", initializePayment)
orderRouter.post("/payment/verify", verifyPayment)

export default orderRouter;