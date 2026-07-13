import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    setCart: (state, action) => {
      console.trace("setCart payload:", action.payload);
      state.items = action.payload;
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { setCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
