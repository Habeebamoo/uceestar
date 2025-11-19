import jwt from "jsonwebtoken"

export const signToken = (userId) => {
  const payload = {
    userId: String(userId)
  }

  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1d" });
}