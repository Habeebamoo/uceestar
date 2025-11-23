import express from "express";
import { getAdmin, getOrders, signIn, updateOrderStatus } from "../controllers/adminController.js";
import { createProduct } from "../controllers/productController.js"
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import upload from "../config/multer.js"

const adminRouter = express();

adminRouter.post("/signin", signIn)
adminRouter.get("/me", verifyAdmin, getAdmin)
adminRouter.get("/orders", verifyAdmin, getOrders)
adminRouter.post("/order/:id/status", verifyAdmin, updateOrderStatus)
adminRouter.post("/products", verifyAdmin, upload.single("file"), createProduct)

export default adminRouter