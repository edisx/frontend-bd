import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USE_PROXY = import.meta.env.VITE_PROXY === "False";
const API_URL = USE_PROXY ? import.meta.env.VITE_API_URL : "";



export const fetchSingleProduct = createAsyncThunk(
  "productSingle/fetchSingleProduct",
  async (id) => {
    const { data } = await axios.get(`${API_URL}/api/products/${id}`);
    return data;
  }
);

const productSingleSlice = createSlice({
  name: "productSingle",
  initialState: {
    product: {},
    loading: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProduct.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.loading = "idle";
      state.product = action.payload;
      state.error = null;
    });
    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.error.message;
    });
  },
});

export default productSingleSlice.reducer;
