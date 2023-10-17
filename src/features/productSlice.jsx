import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USE_PROXY = import.meta.env.VITE_PROXY === 'False';
const API_URL = USE_PROXY ? import.meta.env.VITE_API_URL : "";

export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (id) => {
    const { data } = await axios.get(`${API_URL}/api/products/${id}/`);
    return data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const { data } = await axios.get(`${API_URL}/api/products/`);
    return data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    product: {},
    products: [],
    loading: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    // Single Product Handlers
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

    // All Products Handlers
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

export default productSlice.reducer;
