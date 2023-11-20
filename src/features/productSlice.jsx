import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USE_PROXY = import.meta.env.VITE_PROXY === "False";
const API_URL = USE_PROXY ? import.meta.env.VITE_API_URL : "";

export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (id) => {
    const { data } = await axios.get(`${API_URL}/api/products/${id}/`);
    return data;
  }
);


export const fetchAllProducts = createAsyncThunk(
  'allProducts/fetchAll',
  async (keyword = '', { rejectWithValue }) => {
    try {
      const endpoint = `${API_URL}/api/products/?keyword=${keyword}`;
      const response = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
    }
  }
);

export const fetchSingleProductForAdmin = createAsyncThunk(
  "admin/products/fetchSingleProduct",
  async (id, { rejectWithValue, getState }) => {
    const {
      user: { userInfo },
    } = getState();

    try {
      const { data } = await axios.get(`${API_URL}/api/products/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAllProductsForAdmin = createAsyncThunk(
  "admin/products/fetchAllProducts",
  async (_, { rejectWithValue, getState }) => {
    const {
      user: { userInfo },
    } = getState();

    try {
      const { data } = await axios.get(`${API_URL}/api/products/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue, getState }) => {
    const {
      user: { userInfo },
    } = getState();

    try {
      await axios.delete(`${API_URL}/api/products/delete/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      return id; // we return the ID on successful deletion so that you can potentially remove it from the client-side list immediately.
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue, getState }) => {
    const {
      user: { userInfo },
    } = getState();

    try {
      const { data } = await axios.post(
        `${API_URL}/api/products/create/`,
        productData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }, { rejectWithValue, getState }) => {
    const {
      user: { userInfo },
    } = getState();

    try {
      const { data } = await axios.put(
        `${API_URL}/api/products/update/${id}/`,
        productData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createProductReview = createAsyncThunk(
  "products/createProductReview",
  async ({ productId, reviewData }, { rejectWithValue, getState }) => {
    const {
      user: { userInfo },
    } = getState();

    try {
      const response = await axios.post(
        `${API_URL}/api/products/${productId}/reviews`,
        reviewData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      return { productId, review: response.data };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteProductReview = createAsyncThunk(
  "products/deleteProductReview",
  async ({ productId, reviewId }, { rejectWithValue, getState }) => {
    const {
      user: { userInfo },
    } = getState();

    try {
      await axios.delete(
        `${API_URL}/api/products/${productId}/reviews/${reviewId}/delete`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      return { productId, reviewId };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
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

    // Single Product Handlers
    builder.addCase(fetchSingleProductForAdmin.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(fetchSingleProductForAdmin.fulfilled, (state, action) => {
      state.loading = "idle";
      state.product = action.payload;
      state.error = null;
    });
    builder.addCase(fetchSingleProductForAdmin.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.error.message;
    });

    // All Products Handlers
    builder.addCase(fetchAllProductsForAdmin.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(fetchAllProductsForAdmin.fulfilled, (state, action) => {
      state.loading = "idle";
      state.products = action.payload;
      state.error = null;
    });
    builder.addCase(fetchAllProductsForAdmin.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.error.message;
    });

    // Delete Product Handlers
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = "idle";
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      ); // remove the deleted product from the list
      state.error = null;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.error.message;
    });

    // Create Product Handlers
    builder.addCase(createProduct.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = "idle";
      state.products.push(action.payload); // add the new product to the list
      state.error = null;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.error.message;
    });

    // Update Product Handlers
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = "idle";
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      state.error = null;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
