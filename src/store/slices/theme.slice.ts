import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  mode: "light" | "dark";
  palette: "default" | "brand" | "neutral";
}

const initialState: ThemeState = {
  mode: "light",
  palette: "default",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setMode: (state, action: PayloadAction<"light" | "dark">) => {
      state.mode = action.payload;
    },
    setPalette: (state, action: PayloadAction<ThemeState["palette"]>) => {
      state.palette = action.payload;
    },
  },
});

export const { toggleMode, setMode, setPalette } = themeSlice.actions;
export default themeSlice.reducer;
