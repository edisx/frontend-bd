import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const USE_PROXY = import.meta.env.VITE_PROXY === "False";
const API_URL = USE_PROXY ? import.meta.env.VITE_API_URL : "";

// get all sizes {{URL}}/api/sizes
export const getSizes = createAsyncThunk(
    "sizes/getSizes",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`${API_URL}/api/sizes/`);
        return data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
);

// update product sizes {{URL}}/api/sizes/update/
export const updateProductSizes = createAsyncThunk(
    "sizes/updateProductSizes",
    async (payload, { getState, rejectWithValue }) => {
        const { user: { userInfo } } = getState();

        try {
            const { data } = await axios.post(
                `${API_URL}/api/sizes/update/`,
                payload, 
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

// dispatch(updateProductSizes({ product_id: 1, size_ids: [2, 3, 4] }));
// dispatch(updateProductSizes({ product_id: 1, size_ids: [] }));

const sizeSlice = createSlice({
    name: "sizes",
    initialState: {
        sizes: [],
        loading: "idle",
        error: null,
    },
    extraReducers: (builder) => {
        // get sizes
        builder.addCase(getSizes.pending, (state) => {
            state.loading = "loading";
        });
        builder.addCase(getSizes.fulfilled, (state, action) => {
            state.loading = "idle";
            state.sizes = action.payload;
            state.error = null;
        });
        builder.addCase(getSizes.rejected, (state, action) => {
            state.loading = "idle";
            state.error = action.payload;
        });
    }
});

export default sizeSlice.reducer;



