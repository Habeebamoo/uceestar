import { Order } from "../models/Order.js";

// @desc get orders
// @route GET - /api/order
// @access Users only
export const getOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.userId })

  if (!orders) {
    return res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "No Orders",
      data: []
    })
  }

  return res.status(200).json({
    status: "success",
    statusCode: 200,
    data: orders
  })
}

// @desc  initialize payment for checkout
// @route POST - /api/order/payment/initialize
// @access Users only
export const initializePayment = async (req, res) => {
  //validate request
  const { amount, details, cart, email, userId } = req.body;

  if (amount < 10 || !details || cart.length == 0 || !email ||!userId) {
    return res.status(400).json({
      status: "error",
      statusCode: 400,
      message: "Missing fields"
    })
  }

  try {
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        "Content-Type": "application.json",
        "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      },
      body: JSON.stringify({
        email,
        amount: amount * 100,
        callback_url: `${process.env.CLIENT_URL}/payment`,
        metadata: {
          cart,
          details,
          userId
        }
      })
    })

    const data = await response.json()

    if (!response.ok) {
      return res.status(400).json({
        status: "error",
        statusCode: 400,
        message: data.message
      })
    }

    return res.status(200).json({
      status: "success",
      statusCode: 200,
      authorizationURL: data.data.authorization_url
    })
  } catch (error) {
    return res.status(500).json({
      status: "error",
      statusCode: 500,
      message: error.message
    })
  }
}

// @desc  verify payment for checkout
// @route POST - /api/order/payment/verify
// @access Users only
export const verifyPayment = async (req, res) => {
  const { reference } = req.query;

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      },
    })

    if (!response.ok) {
      throw new Error("Failed to verify")
    }

    //extract meta data
    const data = await response.json()
    const { cart, details, userId } = data.data.metadata;

    //calculate deliveryDate
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    const deliveryDateStr = deliveryDate.toISOString().split("T")[0];

    for (const product of cart) {
      const orderData = {
        userId: userId,
        image: product.image | "jdiddi",
        name: product.name,
        category: product.category,
        price: product.price,
        description: product.description,
        quantity: product.quantity,
        location: {
          city: details.city,
          address: details.address,
        },
        phone: details.phone,
        status: "Processing",
        deliveryDate: deliveryDateStr
      };

      await Order.create(orderData)
    }

    return res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Order Successful"
    })
  } catch (error) {
    return res.status(500).json({
      status: "success",
      statusCode: 200,
      message: error.message
    })
  }
}