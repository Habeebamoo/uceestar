import cloudinary from "../config/cloudinary.js";

// @desc  add/create product
// @route   POST - /api/products
// @access  admin only
export const createProduct = async (req, res) => {
  //validate body
  const { name, price, category } = req.body;

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

  //upload to cloudinary
  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "my_uploads" },
      (err, uploaded) => {
        if (err) reject(err);
        else resolve(uploaded)
      }
    ).end(file.buffer)
  });

  //upload result
  const publicId = result.public_id;

  //create bandwidth-optimized url
  const optimizedUrl = cloudinary.url(publicId, {
    transformation: [
      { quality: "auto" },
      { fetch_format: "auto" }
    ]
  });

  console.log(name)
  console.log(price)
  console.log(category)
  console.log(optimizedUrl)

  return res.status(201).json({
    status: "success",
    statusCode: 201,
    message: "Product Created"
  })
}

// @desc  get products
// @route   GET - /api/products
// @access public
