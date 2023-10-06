import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USE_PROXY = import.meta.env.VITE_PROXY === "False";
const API_URL = USE_PROXY ? import.meta.env.VITE_API_URL : "";

// Load user info from local storage if it exists
let savedUserInfo;
try {
  savedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
} catch (error) {
  console.error("Error parsing user info from localStorage", error);
}
const defaultState = {
  userInfo: savedUserInfo ? savedUserInfo : null,
  loading: "idle",
  error: null,
};

// Async action to log in user
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/users/login/`, {
        username,
        password,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async action to register user
export const registerUser = createAsyncThunk(
  "user/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/users/register/`, {
        name,
        email,
        password,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async action for user profile (/api/users/profile)
export const fetchUserProfile = createAsyncThunk(
  "user/profile",
  async (_, { getState, rejectWithValue }) => {
    const {
      user: { userInfo },
    } = getState();
    try {
      const response = await axios.get(`${API_URL}/api/users/profile/`, {
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

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ name, email, password }, { getState, rejectWithValue }) => {
    const {
      user: { userInfo },
    } = getState();
    try {
      const response = await axios.put(
        `${API_URL}/api/users/profile/update/`,
        {
          name,
          email,
          password,
        },
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

const userSlice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {
    // logout
    logoutUser: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    // log in
    builder.addCase(loginUser.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = "idle";
      state.userInfo = action.payload;
      state.error = null;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload?.detail || "An error occurred.";
    });
    // register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = "idle";
      state.userInfo = action.payload;
      state.error = null;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload?.detail || "An error occurred.";
    });
    // user profile
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.loading = "idle";
      state.userInfo = action.payload;
      state.error = null;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload?.detail || "An error occurred.";
    });
    // update user profile
    builder.addCase(updateUserProfile.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.loading = "idle";
      state.userInfo = action.payload;
      state.error = null;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload?.detail || "An error occurred.";
    });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
