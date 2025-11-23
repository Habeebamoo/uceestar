import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL)
    console.log("...Connected To Database...")
  } catch (error) {
    console.error("...Failed to connect to database...")
  }
}