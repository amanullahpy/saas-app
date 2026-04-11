import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./slices/theme.slice";
import userReducer from "./slices/user.slice";
import appReducer from "./slices/app.slice";

const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
  app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
