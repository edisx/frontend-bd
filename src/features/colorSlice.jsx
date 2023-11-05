import { createSlice } from "@reduxjs/toolkit";

let savedColors;
try {
  savedColors = JSON.parse(localStorage.getItem("colors"));
} catch (error) {
  console.error("Error parsing colors from localStorage", error);
}

const defaultState = [];

const colorSlice = createSlice({
  name: "color",
  initialState: savedColors ? savedColors : defaultState,
  reducers: {
    setColor: (state, action) => {
      const { meshId, color } = action.payload;
      // Find the index of the color entry with the same meshId, if it exists
      const index = state.findIndex((entry) => entry.meshId === meshId);

      if (index !== -1) {
        // If the entry exists, update its color
        state[index].color = color;
      } else {
        // If the entry does not exist, add a new entry
        state.push({ meshId, color });
      }

      // Persist the updated state to local storage
      localStorage.setItem("colors", JSON.stringify(state));
    },
    resetColors: (state) => {
      // Reset the colors array to an empty array
      state.splice(0, state.length);
      // Remove the item from local storage
      localStorage.removeItem("colors");
    },
    // You can add more reducers for different functionalities
  },
});

export const { setColor, resetColors } = colorSlice.actions;
export default colorSlice.reducer;
