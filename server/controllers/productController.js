import { Product } from "../models/Product.js";
import { Review } from "../models/Review.js"
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

// @desc  update products
// @route   PUT - /api/admin/products/:id/update
// @access public
export const updateProduct = async (req, res) => {
  //validate body
  const { name, price, category, description } = req.body;
  const { id } = req.params;

  if (!name || !price || !category || !description) {
    return res.status(400).json({
      status: "error",
      statusCode: 400,
      message: "Missing Fields"
    })
  }

  //validate product file
  const file = req.file;

  //update with new image
  if (file) {
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
      //update product
      await Product.findByIdAndUpdate(id, { name, price, description, category, image: optimizedUrl })

      return res.status(201).json({
        status: "success",
        statusCode: 201,
        message: "Product Updated"
      })
    } catch (error) {
      return res.status(500).json({
        status: "error",
        statusCode: 500,
        message: "Product Update Failed"
      })
    }
  } else {
    try {
      //update product
      await Product.findByIdAndUpdate(id, { name, price, description, category })

      return res.status(201).json({
        status: "success",
        statusCode: 201,
        message: "Product Updated"
      })
    } catch (error) {
      return res.status(500).json({
        status: "error",
        statusCode: 500,
        message: "Product Update Failed"
      })
    }
  } 
}

// @desc  get products reviews
// @route   GET - /api/products/:id/reviews
// @access public
export const getReviews = async (req, res) => {
  const { id } = req.params;

  try {
    const reviews = await Review.find({ productId: id });

    if (!reviews) {
      return res.status(200).json({ success: true, data: reviews })
    }

    return res.status(200).json({ success: true, data: reviews })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Serve Error" })
  }
}

// @desc  create products review
// @route   POST - /api/products/:id/reviews
// @access Users only
export const createReview = async (req, res) => {
  const { id } = req.params;
  const { name, comment, stars } = req.body;

  if (!name || !comment) {
    return res.status(400).json({ success: false, message: "Missing Fields "})
  }

  try {
    await Review.create({ productId: id, name: name, comment: comment, stars: stars });

    return res.status(201).json({ success: true, message: "Comment Added" })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Serve Error" })
  }
}
