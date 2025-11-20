export const RequireApiKey = (req, res, next) => {
  const authHeader = req.header("Authorization")

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({
      status: "error",
      statusCode: 401,
      message: "Invalid Authorization Format"
    })
  }

  const apiKey = parts[1];

  if (!apiKey) {
    return res.status(401).json({
      status: "error",
      statusCode: 401,
      message: "API KEY Missing"
    })
  }

  if (apiKey != process.env.API_KEY) {
    return res.status(401).json({
      status: "error",
      statusCode: 401,
      message: "Invalid API KEY"
    })
  }

  next()
}