import { Admin } from "../models/Admin.js";
import { Order } from "../models/Order.js"
import jwt from "jsonwebtoken";

// @desc admin sign in
// @route POST - /api/admin/signin
// @access public
export const signIn = async (req, res) => {
  //validate request
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      status: "error",
      statusCode: 400,
      message: "Invalid Email"
    })
  }

  //validate email
  const admin = await Admin.findOne({ email })

  if (!admin) {
    return res.status(401).json({
      status: "error",
      statusCode: 401,
      message: "Invalid Email"
    })
  }

  const token = jwt.sign(
    { adminId: admin._id, role: "admin" },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );

  console.log(admin)
  console.log(token)

  //set cookies
  res.cookie("auth_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  })

  return res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "Admin Login Successful"
  })
}

// @desc get admin
// @route GET - /api/admin/me
// @access admin only
export const getAdmin = async (req, res) => {
  const session = req.user;

  try {
    const admin = await Admin.findOne({ _id: session.adminId })

    return res.status(200).json({
      status: "success",
      statusCode: 200,
      data: admin
    })
  } catch (error) {
    return res.status(500).json({
      status: "error",
      statusCode: 500,
      message: error.message
    })
  }
}

// @desc Get all orders
// @route GET - /api/admin/orders
// @access Admin only
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({});

    if (!orders) {
      return res.status(200).json({
        status: "success",
        statusCode: 200,
        data: [],
      })
    }

    return res.status(200).json({
      status: "success",
      statusCode: 200,
      data: orders,
    })
  } catch (error) {
    return res.status(500).json({
      status: "error",
      statusCode: 200,
      message: "Internal Server Error"
    })
  }
}

// @desc Update order status
// @route POST - /api/admin/order/{id}/status
// @access Admin only
export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!id || !status) {
    return res.status(400).json({
      status: "error",
      statusCode: 400,
      message: "Missing Fields"
    })
  }

  try {
    await Order.findByIdAndUpdate(id, { status: status })

    return res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Order Updated"
    })
  } catch (error) {
    return res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Internal Server Error"
    })
  }
}

