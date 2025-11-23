import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string,
  name: string,
  email: string
}

type stateType = {
  profile: User | null,
  admin: User | null,
}

const initialState: stateType = {
  profile: null,
  admin: null
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
    }
  }
})

export const { setProfile, setAdmin } = userSlice.actions;
export default userSlice.reducer;