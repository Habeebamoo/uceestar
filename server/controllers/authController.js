import { User } from "../models/User.js";
import { signToken } from "../utils/jwt.js";

// @desc sign in (log in & sign in) user
// @route POST - /api/auth/signin
export const SignIn = async (req, res) => {
  //validate request
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      status: "error",
      statusCode: 400,
      message: "Missing Fields",
    })
  }

  //checks if user exists
  const foundUser = await User.findOne({ email: email })

  if (foundUser) {
    //sign jwt token
    const token = signToken(foundUser._id)

    //set cookies
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })

    return res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Logged In Successfully"
    })
  }

  //create user
  try {
    const user = new User({ name, email })
    await user.save();

    const token = signToken(user._id)

    //set cookies
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })

    return res.status(201).json({
      status: "success",
      statusCode: 201,
      message: "Signed Up Successfully"
    })
  } catch (error) {
    return res.status(200).json({
      status: "error",
      statusCode: 500,
      message: "Sign In Failed"
    })
  }
}