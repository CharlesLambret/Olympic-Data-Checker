import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "@/auth/types/user";

interface UserState {
  data: UserType;
}

const initialState: UserState = {
  data: <UserType>{},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.data = action.payload;
    },
    clearUser: (state) => {
      state.data = <UserType>{};
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
