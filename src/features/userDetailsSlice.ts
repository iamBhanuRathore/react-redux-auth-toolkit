import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

export interface AuthState {
  name: string | null;
  role: string | null;
  userId: string | null;
  age: string | null;
  designation: string[];
}

const initialState = {
  name: "",
  role: "",
  userId: "",
  age: "",
  designation: [""],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        name: string;
        role: string;
        userId: string;
        age: string;
        designation: string[];
      }>
    ) => {
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.userId = action.payload.userId;
      state.age = action.payload.age;
      state.designation = action.payload.designation;
    },
    logOutUser: (state) => {
      localStorage.clear();
      state.name = "";
      state.role = "";
      state.userId = "";
      state.age = "";
      state.designation = [""];
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const { setUser, logOutUser } = authSlice.actions;
export default authSlice.reducer;
