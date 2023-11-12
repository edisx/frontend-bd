import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const USE_PROXY = import.meta.env.VITE_PROXY === "False";
const API_URL = USE_PROXY ? import.meta.env.VITE_API_URL : "";


export const addOrder = createAsyncThunk(
  'order/addOrder',
  async (order, { rejectWithValue, getState }) => {
    const {
      user: { userInfo },
    } = getState();
    try {
      const response = await axios.post(
        `${API_URL}/api/orders/add/`,
        order,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getOrderById = createAsyncThunk(
  'order/getOrderById',
  async (orderId, { rejectWithValue, getState }) => {
    const {
      user: { userInfo },
    } = getState();
    try {
      const response = await axios.get(
        `${API_URL}/api/orders/${orderId}/`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const payOrder = createAsyncThunk(
  'orderPay/payOrder',
  async ({ id, paymentResult }, { rejectWithValue, getState }) => {
    const {
      user: { userInfo },
    } = getState();
    try {
      const response = await axios.put(
        `${API_URL}/api/orders/${id}/pay/`,
        paymentResult,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      if (response.status !== 200) { // If status is not 200, throw an error
        throw new Error('Request failed');
      }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    currentOrder: null, // New state for storing a single order
    orders: [],         // Assuming you have this for storing multiple orders
    // ... other states
    loading: "idle",
    error: null,
  },
  reducers: {
    // ... your existing reducers
  },
  extraReducers: (builder) => {
    // get order by id
    builder.addCase(getOrderById.pending, (state, action) => {
      state.loading = "loading";
    });
    builder.addCase(getOrderById.fulfilled, (state, action) => {
      state.loading = "idle";
      state.currentOrder = action.payload;
      state.error = null;
    });
    builder.addCase(getOrderById.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });
  }
});

export default orderSlice.reducer;


