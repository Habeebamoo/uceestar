import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
})

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
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
  },
  quantity: {
    type: Number,
    required: true
  },
  location: LocationSchema,
  phone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  deliveryDate: {
    type: String,
    required: true
  }
})

export const Order = mongoose.model('Order', OrderSchema) 