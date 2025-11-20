import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productSlice"
import cartReducer from "./reducers/cartSlice"
import userReducer from "./reducers/userSlice"

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    user: userReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;