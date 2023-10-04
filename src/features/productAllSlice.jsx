import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USE_PROXY = import.meta.env.VITE_PROXY === 'False';
const API_URL = USE_PROXY ? import.meta.env.VITE_API_URL : "";




export const fetchAllProducts = createAsyncThunk(
  "productAll/fetchAllProducts",
  async () => {
    const { data } = await axios.get(`${API_URL}/api/products/`);
    return data;
  }
);

const productAllSlice = createSlice({
  name: "productAll",
  initialState: {
    products: [],
    loading: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.loading = "idle";
      state.products = action.payload;
      state.error = null;
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.error.message;
    });
  },
});

export default productAllSlice.reducer;
