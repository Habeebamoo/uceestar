import { Admin } from "../models/Admin.js"
import jwt from "jsonwebtoken";

// @desc admin sign in
// @route POST - /api/admin/signin
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