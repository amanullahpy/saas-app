import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  sidebarOpen: boolean;
  activeModule: string;
  notifications: Array<{
    id: string;
    type: "info" | "success" | "warning" | "error";
    message: string;
  }>;
}

const initialState: AppState = {
  sidebarOpen: true,
  activeModule: "dashboard",
  notifications: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setActiveModule: (state, action: PayloadAction<string>) => {
      state.activeModule = action.payload;
    },
    addNotification: (state, action: PayloadAction<Omit<AppState["notifications"][0], "id">>) => {
      state.notifications.push({
        id: Math.random().toString(36).substring(7),
        ...action.payload,
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload);
    },
  },
});

export const { toggleSidebar, setSidebarOpen, setActiveModule, addNotification, removeNotification } = appSlice.actions;
export default appSlice.reducer;
