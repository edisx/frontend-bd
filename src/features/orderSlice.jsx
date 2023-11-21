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

export const getMyOrders = createAsyncThunk(
  'order/getMyOrders',
  async (_, { rejectWithValue, getState }) => {
    const {
      user: { userInfo },
    } = getState();
    try {
      const response = await axios.get(
        `${API_URL}/api/orders/myorders/`,
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

export const getAllOrders = createAsyncThunk(
  'order/getAllOrders',
  async ({ page = 1 }, { rejectWithValue, getState }) => {
    const {
      user: { userInfo },
    } = getState();

    try {
      const endpoint = `${API_URL}/api/orders/?page=${page}`;
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateOrderToDelivered = createAsyncThunk(
  'order/updateOrderToDelivered',
  async (orderId, { rejectWithValue, getState }) => {
    const {
      user: { userInfo },
    } = getState();
    try {
      const response = await axios.put(
        `${API_URL}/api/orders/${orderId}/deliver/`,
        {},
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

export const resetOrderToUndelivered = createAsyncThunk(
  'order/resetOrderToUndelivered',
  async (orderId, { rejectWithValue, getState }) => {
    const { user: { userInfo } } = getState();
    try {
      const response = await axios.put(
        `${API_URL}/api/orders/${orderId}/undeliver/`, 
        {},
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

export const updateOrderToShipped = createAsyncThunk(
  'order/updateOrderToShipped',
  async (orderId, { rejectWithValue, getState }) => {
    const { user: { userInfo } } = getState();
    try {
      const response = await axios.put(
        `${API_URL}/api/orders/${orderId}/shipped/`, 
        {},
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


export const resetOrderToUnshipped = createAsyncThunk(
  'order/resetOrderToUnshipped',
  async (orderId, { rejectWithValue, getState }) => {
    const { user: { userInfo } } = getState();
    try {
      const response = await axios.put(
        `${API_URL}/api/orders/${orderId}/unshipped/`, 
        {},
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





const orderSlice = createSlice({
  name: 'order',
  initialState: {
    currentOrder: null, 
    orders: [],        
    loading: "idle",
    error: null,
    page: 1,
    pages: 1,
  },
  reducers: {
    resetOrders: (state) => {
      state.currentOrder = null;
      state.orders = [];
      state.loading = "idle";
      state.error = null;
    }
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
    // get my orders
    builder.addCase(getMyOrders.pending, (state, action) => {
      state.loading = "loading";
    });
    builder.addCase(getMyOrders.fulfilled, (state, action) => {
      state.loading = "idle";
      state.orders = action.payload;
      state.error = null;
    });
    builder.addCase(getMyOrders.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });
    // get all orders
    builder.addCase(getAllOrders.pending, (state, action) => {
      state.loading = "loading";
    });
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.loading = "idle";
      state.orders = action.payload.orders;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
    });
    builder.addCase(getAllOrders.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });
    // deliver order
    builder.addCase(updateOrderToDelivered.pending, (state, action) => {
      state.loading = "loading";
    });
    builder.addCase(updateOrderToDelivered.fulfilled, (state, action) => {
      state.currentOrder.is_delivered = true;
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(updateOrderToDelivered.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });
    // reset order to undelivered
    builder.addCase(resetOrderToUndelivered.pending, (state, action) => {
      state.loading = "loading";
    });
    builder.addCase(resetOrderToUndelivered.fulfilled, (state, action) => {
      state.currentOrder.is_delivered = false;
      state.currentOrder.delivered_at = null;
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(resetOrderToUndelivered.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });
    // update order to shipped
    builder.addCase(updateOrderToShipped.pending, (state, action) => {
      state.loading = "loading";
    });
    builder.addCase(updateOrderToShipped.fulfilled, (state, action) => {
      state.currentOrder.is_shipped = true;
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(updateOrderToShipped.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });
    // reset order to unshipped
    builder.addCase(resetOrderToUnshipped.pending, (state, action) => {
      state.loading = "loading";
    });
    builder.addCase(resetOrderToUnshipped.fulfilled, (state, action) => {
      state.currentOrder.is_shipped = false;
      state.currentOrder.shipped_at = null;
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(resetOrderToUnshipped.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });
    // pay order
    builder.addCase(payOrder.pending, (state, action) => {
      state.loading = "loading";
    });
    builder.addCase(payOrder.fulfilled, (state, action) => {
      state.currentOrder.is_paid = true;
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(payOrder.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });
    // add order
    builder.addCase(addOrder.pending, (state, action) => {
      state.loading = "loading";
    });
    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.loading = "idle";
      state.currentOrder = action.payload;
      state.error = null;
    });
    builder.addCase(addOrder.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });
  }
});

export const { resetOrders } = orderSlice.actions;
export default orderSlice.reducer;


