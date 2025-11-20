import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({
      status: "error",
      statusCode: 401,
      message: "Unauthorized Access"
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded;
  } catch (error) {
    return res.status(401).json({
      status: "error",
      statusCode: 401,
      message: "Unauthorized Access"
    })
  }

  next();
}