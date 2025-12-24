import express from "express";
import { createReview, getProducts, getReviews } from "../controllers/productController.js";
import { verifyUser } from "../middlewares/verifyUser.js"

const productRouter = express.Router();

productRouter.get("/", getProducts)
productRouter.get("/:id/reviews", getReviews)
productRouter.post("/:id/reviews", express.json(), verifyUser, createReview)

export default productRouter;