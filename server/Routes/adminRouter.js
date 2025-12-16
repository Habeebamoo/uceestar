import express from "express";
import { getAdmin, getDashboard, getOrders, getUsers, signIn, updateOrderStatus } from "../controllers/adminController.js";
import { createProduct, updateProduct } from "../controllers/productController.js"
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import upload from "../config/multer.js"

const adminRouter = express();

adminRouter.post("/signin", signIn)
adminRouter.get("/me", verifyAdmin, getAdmin)
adminRouter.get("/orders", verifyAdmin, getOrders)
adminRouter.get("/users", verifyAdmin, getUsers)
adminRouter.get("/dashboard", verifyAdmin, getDashboard)
adminRouter.post("/order/:id/status", verifyAdmin, updateOrderStatus)
adminRouter.put("/products/:id/update", verifyAdmin, upload.single("file"), updateProduct)
adminRouter.post("/products", verifyAdmin, upload.single("file"), createProduct)

export default adminRouter