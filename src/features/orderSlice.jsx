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

