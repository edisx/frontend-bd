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
  usersList: [],
  userDetail: {},
  loading: "idle",
  error: null,
  page: 1,
  pages: 1,
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

// Async action to get all users
export const getUsers = createAsyncThunk(
  'user/getUsers',
  async ({ page = 1 }, { rejectWithValue, getState }) => { 
    const {
      user: { userInfo },
    } = getState();
    try {
      const response = await axios.get(
        `${API_URL}/api/users/?page=${page}`, 
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

// Async action to delete a user
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userId, { rejectWithValue, getState }) => {
    const {
      user: { userInfo },
    } = getState();
    try {
      await axios.delete(
        `${API_URL}/api/users/delete/${userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      return userId; // return userId to indicate successful deletion
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async action to fetch a user by ID
export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (userId, { rejectWithValue, getState }) => {
    const {
      user: { userInfo },
    } = getState();
    try {
      const response = await axios.get(
        `${API_URL}/api/users/${userId}/`,
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

// Async action to update a user
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userId, data }, { rejectWithValue, getState }) => {
    const { name, email, password, isAdmin} = data;
    const {
      user: { userInfo },
    } = getState();
    try {
      const response = await axios.put(
        `${API_URL}/api/users/update/${userId}/`,
        {
          name,
          email,
          password,
          isAdmin
        },
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

    // getUsers
    builder.addCase(getUsers.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = "idle";
      state.usersList = action.payload.users;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
      state.error = null;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload?.detail || "An error occurred.";
    });

    // deleteUser
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.usersList = state.usersList.filter(user => user.id !== action.payload);
    });

    // fetchUserById
    builder.addCase(fetchUserById.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.loading = "idle";
      state.userDetail = action.payload;
      state.error = null;
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload?.detail || "An error occurred.";
    });

    // updateUser
    builder.addCase(updateUser.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = "idle";
      state.userDetail = action.payload; 
      state.error = null;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload?.detail || "An error occurred.";
    });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
