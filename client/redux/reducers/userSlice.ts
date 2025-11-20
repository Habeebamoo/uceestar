import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string,
  name: string,
  email: string
}

type stateType = {
  profile: User | null
}

const initialState: stateType = {
  profile: null
}
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<User>) => {
      state.profile = action.payload;
    }
  }
})

export const { setProfile } = userSlice.actions;
export default userSlice.reducer;