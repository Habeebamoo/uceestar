import { User } from "../models/User.js";

// @desc get user profile
// @route GET - /api/user/me
export const getUser = async (req, res) => {
  const session = req.user;
  
  const user = await User.findById(session.userId)

  if (!user) {
    return res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Internal Server Error"
    })
  }

  return res.status(200).json({
    status: "success",
    statusCode: 200,
    data: user
  })
}