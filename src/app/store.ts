import { setupListeners } from "@reduxjs/toolkit/query/react";
import { authApis } from "@/service/authApi";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import userReducer from "../features/userDetailsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userDetails: userReducer,
    [authApis.reducerPath]: authApis.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApis.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);
