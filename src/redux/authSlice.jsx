import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    loginSuccess: (state, action)  => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem(
        "token",
        action.payload.token
      );
    },

    setUser: (state, action)=>{
        state.user = action.payload
    },

    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout, setUser } = authSlice.actions;

export default authSlice.reducer;