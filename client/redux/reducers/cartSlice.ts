import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type stateType = {
  cart: CartItem[]
}

const initialState: stateType = {
  cart: []
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cart = action.payload
    },

    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cart.find((prod: Product) => prod.id === action.payload.id)

      if (!existingItem) {
        state.cart = [ ...state.cart, action.payload ]
        return
      }

      existingItem.quantity += action.payload.quantity;

      localStorage.setItem("uceestar-cart", JSON.stringify(state.cart))
    }
  }
})

export const { setCart, addToCart } = cartSlice.actions;
export default cartSlice.reducer;