import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/api';

export const fetchAllProduct = createAsyncThunk(
  'products/fetchAll',
  async () => {
    try {
      const response = await api().get('/products');
      return response.data;
    } catch (error) {
      console.log('ürünler çekilirken hata oldu');
    }
  },
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (form, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await api().post(`/products`, form, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    data: null,
    loading: false,
    error: null,
    isAddSuccess: false,
  },
  reducers: {
    changeError: (state, action) => {
      state.error = action.payload;
    },
    changeSuccess: (state, action) => {
      state.isAddSuccess = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAllProduct.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllProduct.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAllProduct.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(addProduct.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.data.unshift(action.payload);
      state.loading = false;
      state.isAddSuccess = true;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isAddSuccess = false;
    });
  },
});

export const {changeError, changeSuccess} = productSlice.actions;

export default productSlice.reducer;
