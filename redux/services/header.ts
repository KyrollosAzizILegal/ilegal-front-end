import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "Home",
  initialState: {
    name: "Home",
  },
  reducers: {
    setHeader(state, action) {
      state.name = action.payload; // Update the header state
    },
  },
});

export const { setHeader } = homeSlice.actions;

export default homeSlice.reducer;
