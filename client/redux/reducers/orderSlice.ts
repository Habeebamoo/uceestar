import { Order } from "@/types/order";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StateType = {
  orders: Order[]
}

const initialState: StateType = {
  orders: []
}

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    }
  }
})

export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;