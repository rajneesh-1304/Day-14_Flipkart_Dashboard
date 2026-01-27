import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCouponsThunk = createAsyncThunk(
  'coupon/fetchCoupons',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('http://localhost:3001/coupon');
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch coupons');
    }
  }
);

const couponSlice = createSlice({
  name: 'coupon',
  initialState: {
    coupons: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCouponsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCouponsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(fetchCouponsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default couponSlice.reducer;
