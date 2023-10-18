import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USE_PROXY = import.meta.env.VITE_PROXY === "False";
const API_URL = USE_PROXY ? import.meta.env.VITE_API_URL : "";

// fetch all categories {{URL}}/api/categories/
export const fetchAllCategories = createAsyncThunk(
  "categories/fetchAllCategories",
  async () => {
    const { data } = await axios.get(`${API_URL}/api/categories/`);
    return data;
  }
);

// create category {{URL}}/api/categories/create
export const createCategory = createAsyncThunk(
  "categories/createCategory/",
  async (category, { rejectWithValue, getState }) => {
    const {
      user: { userInfo },
    } = getState();

    try {
      const { data } = await axios.post(
        `${API_URL}/api/categories/create/`,
        category,
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

// update category {{URL}}/api/categories/update/:id
export const updateCategory = createAsyncThunk(
  "categories/updateCategory/",
  async ({ id, category }, { rejectWithValue, getState }) => {
    const {
      user: { userInfo },
    } = getState();

    try {
      const { data } = await axios.put(
        `${API_URL}/api/categories/update/${id}/`,
        category,
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

// delete category {{URL}}/api/categories/delete/:id
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue, getState }) => {
    const {
      user: { userInfo },
    } = getState();

    try {
      const { data } = await axios.delete(
        `${API_URL}/api/categories/delete/${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetchAllCategories
    builder.addCase(fetchAllCategories.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.categories = action.payload;
      state.error = null;
    });
    builder.addCase(fetchAllCategories.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload.error;
    });

    // Handle createCategory
    builder.addCase(createCategory.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.categories.push(action.payload);
      state.error = null;
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload.error;
    });

    // Handle updateCategory
    builder.addCase(updateCategory.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.loading = "succeeded";
      const index = state.categories.findIndex(
        (cat) => cat.id === action.payload.id
      );
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
      state.error = null;
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload.error;
    });

    // Handle deleteCategory
    builder.addCase(deleteCategory.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.categories = state.categories.filter(
        (cat) => cat.id !== action.payload
      );
      state.error = null;
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload.error;
    });
  },
});

export const { categoryDeleted } = categorySlice.actions;
export default categorySlice.reducer;
