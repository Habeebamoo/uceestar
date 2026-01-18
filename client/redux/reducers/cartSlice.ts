import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type stateType = {
  cart: CartItem[]
}

type UpdatePayload = {
  cartItem: CartItem,
  quantity: number
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
      const existingItem = state.cart.find((prod: Product) => prod._id == action.payload._id)

      if (!existingItem) {
        state.cart = [ ...state.cart, action.payload ]
      } else {
        existingItem.quantity += action.payload.quantity;
      }

      localStorage.setItem("uceestar-cart", JSON.stringify(state.cart))
    },

    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      state.cart = state.cart.filter(item => item._id != action.payload._id)

      localStorage.setItem("uceestar-cart", JSON.stringify(state.cart))
    },

    incrementQuantity: (state, action: PayloadAction<CartItem>) => {
      const item = state.cart.find(prd => prd._id === action.payload._id);

      item!.quantity += 1;
      localStorage.setItem("uceestar-cart", JSON.stringify(state.cart))
    },

    decermentQuantity: (state, action: PayloadAction<CartItem>) => {
      const item = state.cart.find(prd => prd._id === action.payload._id);

      if (item!.quantity >= 1) {
        item!.quantity -= 1;
      }

      localStorage.setItem("uceestar-cart", JSON.stringify(state.cart))
    },

    clearCart: (state, action) => {
      state.cart = [];

      localStorage.setItem("uceestar-cart", JSON.stringify(state.cart))
    }
  }
})

export const { setCart, addToCart, removeFromCart, incrementQuantity, decermentQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;