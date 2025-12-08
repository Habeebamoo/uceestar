import { Product } from "@/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type stateType = {
  products: Product[]
}

const initialState: stateType = {
  products: [{
      _id: "dkoefm",
      image: "D",
      name: "Nike",
      category: "footwears",
      price: 95000,
      description: "Nike Sneakers"
  }, {
      _id: "dkhewunm",
      image: "D",
      name: "Prada",
      category: "footwears",
      price: 46000,
      description: "Prada Sneakers"
  }, ]
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