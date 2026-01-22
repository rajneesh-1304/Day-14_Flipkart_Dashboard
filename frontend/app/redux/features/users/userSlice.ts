import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {userService} from './userService'
import { loginUser, registerUser } from "./service";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

interface UserState {
  userData: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userData: [],
  currentUser: null,
  loading: false,
  error: null,
};

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (userData,{rejectWithValue}) => {
    try {
      return await registerUser(userData);
    } catch (err: any) {
        return rejectWithValue(err.response.data.message);
    }
  }
);

export const loginThunk = createAsyncThunk (
  "auth",
  async (userData: any, {rejectWithValue}) => {
    try {
      return await loginUser(userData);
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const usersSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUsers: (state) => {
      state.userData = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.userData;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add product";
      })
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.currentUser = action.payload.user;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add product";
      });   
  },
});

export const { clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
