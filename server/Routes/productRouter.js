import express from "express";
import { upload } from "../config/multer.js";
import { createProduct } from "../controllers/productController.js"

const productRouter = express.Router();

productRouter.post("/", upload.single("file"), createProduct)

export default productRouter;