import { Product } from "../models/Product.js";
import imageKit from "../config/imagKit.js"
import fs from "fs"

// @desc  add/create product
// @route   POST - /api/products
// @access  admin only
export const createProduct = async (req, res) => {
  //validate body
  const { name, price, category, description } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({
      status: "error",
      statusCode: 400,
      message: "Missing Fields"
    })
  }

  //validate product file
  const file = req.file;

  if (!file) {
    return res.status(400).json({
      status: "error",
      statusCode: 400,
      message: "Product Image Missing"
    })
  }

  //validate size
  const MAX_SIZE = 2 * 1024 * 1024;

  if (file.size > MAX_SIZE) {
    return res.status(400).json({
      status: "error",
      statusCode: 400,
      message: "Image must be 2MB or less"
    })
  }

  //covert file to 64 bits format
  const fileBuffer = fs.readFileSync(file.path);
  
  //upload to imagekit
  const result = await imageKit.upload({
    file: fileBuffer,
    fileName: file.originalname,
    folder: "/uceestar"
  })

  //get optimized url
  const optimizedUrl = imageKit.url({
    path: result.filePath,
    transformation: [
      { quality: "auto" },
      { format: "webp" }
    ]
  });

  try {
    await Product.create({ 
      name, 
      description, 
      image: optimizedUrl,
      price, 
      category 
    })

    return res.status(201).json({
      status: "success",
      statusCode: 201,
      message: "Product Created"
    })
  } catch (error) {
    return res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Failed to create Product"
    })
  }
}

// @desc  get products
// @route   GET - /api/products
// @access public
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})

    if (!products) {
      return res.status(200).json({
        status: "success",
        statusCode: 200,
        data: []
      })
    }

    return res.status(200).json({
      status: "success",
      statusCode: 200,
      data: products
    })
  } catch (error) {
    return res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Internal Server Error"
    })
  }
}
