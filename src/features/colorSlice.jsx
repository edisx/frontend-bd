import { createSlice } from "@reduxjs/toolkit";

let savedColors;
try {
  savedColors = JSON.parse(localStorage.getItem("colors"));
} catch (error) {
  console.error("Error parsing colors from localStorage", error);
}

const defaultState = {};


const colorSlice = createSlice({
  name: "color",
  initialState: savedColors ? savedColors : defaultState,
  reducers: {
    setColor: (state, action) => {
      const { meshId, color } = action.payload;
      // Set the color for the mesh, identified by meshId
      state[meshId] = color;
      // Persist the updated state to local storage
      localStorage.setItem("productColors", JSON.stringify(state));
    },
    resetColors: (state) => {
      // Reset all colors
      Object.keys(state).forEach((key) => {
        delete state[key];
      });
      // Remove the item from local storage
      localStorage.removeItem("productColors");
    },
    // You can add more reducers for different functionalities
  },
});

export const { setColor, resetColors } = colorSlice.actions;
export default colorSlice.reducer;
