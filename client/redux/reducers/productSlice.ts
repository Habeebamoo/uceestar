import { Product } from "@/types/product";
import { Review } from "@/types/review";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type stateType = {
  products: Product[],
  reviews: Review[]
}

const initialState: stateType = {
  products: [],
  reviews: []
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setReviews: (state, action: PayloadAction<Review[]>) => {
      state.reviews = action.payload;
    }
  }
})

export const { setProducts, setReviews } = productsSlice.actions;
export default productsSlice.reducer;