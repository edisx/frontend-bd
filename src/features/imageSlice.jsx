import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USE_PROXY = import.meta.env.VITE_PROXY === "False";
const API_URL = USE_PROXY ? import.meta.env.VITE_API_URL : "";

// create new image {{URL}}/api/images/create (in body we pass product_id and image)
export const createImage = createAsyncThunk(
    "images/createImage",
    async (formData, { getState, rejectWithValue }) => {
      const { user: { userInfo } } = getState();
  
      try {
        const { data } = await axios.post(
          `${API_URL}/api/images/create/`,
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

// delete image {{URL}}/api/images/delete/:id
export const deleteImage = createAsyncThunk(
  "images/deleteImage",
  async (id, { getState, rejectWithValue }) => {
    const { user: { userInfo } } = getState();

    try {
      const { data } = await axios.delete(
        `${API_URL}/api/images/delete/${id}/`,
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

