import { Order } from "@/types/order";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StateType = {
  orders: Order[],
  adminOrders: Order[]
}

const initialState: StateType = {
  orders: [],
  adminOrders: []
}

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    setAdminOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    }
  }
})

export const { setOrders, setAdminOrders } = orderSlice.actions;
export default orderSlice.reducer;