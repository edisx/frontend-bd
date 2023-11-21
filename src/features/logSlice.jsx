import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USE_PROXY = import.meta.env.VITE_PROXY === "False";
const API_URL = USE_PROXY ? import.meta.env.VITE_API_URL : "";

export const fetchActionLogs = createAsyncThunk(
  "actionLogs/fetchActionLogs",
  async ({page = 1}, { getState, rejectWithValue }) => {
    const {
      user: { userInfo },
    } = getState();

    try {
      const response = await axios.get(
        `${API_URL}/api/actionlogs/?page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const actionLogsSlice = createSlice({
  name: "actionLogs",
  initialState: {
    logs: [],
    loading: "idle",
    error: null,
    page: 1,
    pages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchActionLogs.pending, (state, action) => {
      state.loading = "loading";
    });
    builder.addCase(fetchActionLogs.fulfilled, (state, action) => {
      state.loading = "idle";
      state.logs = action.payload.actionLogs;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
    });
    builder.addCase(fetchActionLogs.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });
  },
});

export default actionLogsSlice.reducer;
