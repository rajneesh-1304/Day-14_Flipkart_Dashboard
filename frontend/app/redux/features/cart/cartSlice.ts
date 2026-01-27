import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  addToWishlist,
  getWishlist,
} from './cartService';


export const fetchCartThunk = createAsyncThunk(
  'cart/fetch',
  async (userId: number) => {
    return await getCart(userId); 
  }
);

export const addToCartThunk = createAsyncThunk(
  'cart/add',
  async (data: {
    userId: number;
    productId: number;
    quantity: number;
    sellerId: number;
  }) => {
    return await addToCart(data);
  }
);

export const addToWishlistThunk = createAsyncThunk(
  'wishlist',
  async(data:{
     userId: number;
    productId: number;
  }) => {
    return await addToWishlist(data);
  }
)

export const fetchWishlistThunk = createAsyncThunk(
  'wishlist',
  async(userId: number) => {
    return await getWishlist(userId);
  }
)


export const updateQuantityThunk = createAsyncThunk(
  'cart/update',
  async ({ itemId, quantity }: { itemId: number; quantity: number }) => {
    return await updateCartItem(itemId, quantity);
  }
);

export const removeItemThunk = createAsyncThunk(
  'cart/remove',
  async (itemId: number) => {
    return await removeCartItem(itemId);
  }
);

export const clearCartThunk = createAsyncThunk(
  'cart/clear',
  async (userId: number) => {
    return await clearCart(userId);
  }
);


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: null as any,
    loading: false,
    error: null as string | null,
    wishlist: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchCartThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartThunk.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(fetchCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cart';
      })

      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.cart = action.payload;
      })

      .addCase(updateQuantityThunk.fulfilled, (state, action) => {
        state.cart = action.payload;
      })

      .addCase(removeItemThunk.fulfilled, (state, action) => {
        state.cart = action.payload;
      })

      .addCase(clearCartThunk.fulfilled, (state) => {
        state.cart = null;
      })

      .addCase(addToWishlistThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(addToWishlistThunk.fulfilled, (state, action)=> {
        state.wishlist = action.payload;
      })

      .addCase(addToWishlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add in wishlist';
      })
  },
});

export default cartSlice.reducer;
