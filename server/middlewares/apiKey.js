export const RequireApiKey = (req, res, next) => {
  const apiKey = req.header("X-API-KEY")

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