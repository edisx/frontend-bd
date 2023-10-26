import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USE_PROXY = import.meta.env.VITE_PROXY === "False";
const API_URL = USE_PROXY ? import.meta.env.VITE_API_URL : "";



// Async thunk for uploading new 3D model
export const uploadModel = createAsyncThunk(
  "models/uploadModel",
  async (formData, { getState, rejectWithValue }) => {
    const {
      user: { userInfo },
    } = getState();

    try {
      const { data } = await axios.post(
        `${API_URL}/api/models/create/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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


export const deleteModel = createAsyncThunk(
    "models/deleteModel",
    async (modelId, { getState, rejectWithValue }) => {
      const {
        user: { userInfo },
      } = getState();
  
      try {
        const { data } = await axios.delete(
          `${API_URL}/api/models/delete/${modelId}/`,
          {
            headers: {
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