import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String
  }
})

export const Product = mongoose.model('Product', ProductSchema) 