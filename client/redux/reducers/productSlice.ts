import { Product } from "@/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type stateType = {
  products: Product[]
}

const initialState: stateType = {
  products: []
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    }
  }
})

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;