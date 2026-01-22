import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { addProduct, getProducts } from "./productService";

interface Product {
  id: number;
  title: string;
  image?: string;
  price: number;
  description?: string;
  category: string;
  rating?: number;
}

interface ProductState {
  productData: Product[];
  loading: boolean;
  error: string | null;
  total: number;
}

const initialState: ProductState = {
  productData: [],
  loading: false,
  error: null,
  total: 0,
};

interface Pagination {
  limit:number;
  skip:number;
}

export const fetchProductsThunk = createAsyncThunk(
  "products/fetchProducts",
  async ({ limit, skip, title, category }, { rejectWithValue }) => {
    try {
      const data = await productService.getProducts(limit, skip, title, category);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const addProductThunk = createAsyncThunk(
  "products/addproduct",
  async (productData,{rejectWithValue}) => {
    try {
          return await addProduct(productData);
        } catch (err: any) {
          return rejectWithValue(err.response.data.message);
        }
  }
);

export const getProductThunk = createAsyncThunk(
  'products',
  async({limit, skip, searchVal, searchProd})=>{
    try {

      return await getProducts(limit, skip, searchVal, searchProd);
    } catch (err: any) {
    }
  }
)

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.productData = [];
      state.total = 0;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.productData = action.payload.result;
        state.total = action.payload.total;
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(addProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProductThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.productData.push(action.payload); 
        state.total += 1;
      })
      .addCase(addProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add product";
      })
      .addCase(getProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.productData.push(action.payload); 
      })
      .addCase(getProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to Fetch product";
      })  
  },
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;