import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productSlice"
import cartReducer from "./reducers/cartSlice"
import userReducer from "./reducers/userSlice"
import orderReducer from "./reducers/orderSlice"

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    user: userReducer,
    orders: orderReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;