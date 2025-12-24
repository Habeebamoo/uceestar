import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
  }
})

export const Review = mongoose.model('Review', ReviewSchema);