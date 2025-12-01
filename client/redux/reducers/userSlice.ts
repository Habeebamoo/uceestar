import { AdminDashboard, User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type stateType = {
  profile: User | null,
  admin: User | null,
  adminDashboard: AdminDashboard | null
}

const initialState: stateType = {
  profile: null,
  admin: null,
  adminDashboard: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<User>) => {
      state.profile = action.payload;
    },
    setAdmin: (state, action: PayloadAction<User>) => {
      state.admin = action.payload;
    },
    setAdminDashboard: (state, action: PayloadAction<AdminDashboard>) => {
      state.adminDashboard = action.payload;
    }
  }
})

export const { setProfile, setAdmin, setAdminDashboard } = userSlice.actions;
export default userSlice.reducer;