import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Ensure correct import path
import usernameReducer from "./authSlice"; // Import userIdReducer
import postReducer from "./postSlice"; // Import postReducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
    username: usernameReducer,
    posts: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
