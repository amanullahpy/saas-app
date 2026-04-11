import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  profile: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: "admin" | "user" | "guest";
  } | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: UserState = {
  profile: null,
  isAuthenticated: false,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState["profile"]>) => {
      state.profile = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logout: (state) => {
      state.profile = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, logout, setLoading } = userSlice.actions;
export default userSlice.reducer;
