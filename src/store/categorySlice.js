import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../utils/api';
import {fetchAllUserProducts} from './productSlice';

export const fetchAllCategories = createAsyncThunk(
  'categories/fetchAll',
  async () => {
    try {
      const response = await api().get('/categories');
      return response.data;
    } catch (error) {
      console.log('Redux ::> Kategoriler çekilirken hata olustu.');
    }
  },
);

export const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAllCategories.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAllCategories.rejected, state => {
      state.error = null;
      state.loading = false;
    });
  },
});

export const selectCategories = state => state.categories.data;

export default categorySlice.reducer;
