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

export const deleteProduct = createAsyncThunk(
  'user/deleteProduct',
  async id => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await api().delete(`/products/${id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log('Kullanıcıya ait ürünler silinirken bir hata oluştu!');
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
      console.log('redux ::> ', error.response);
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchAllUserProducts = createAsyncThunk(
  'user/fetchAllProducts',
  async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await api().get('/users/products', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log('Kullanıcıya ait ürünler çekilirken bir hata oluştu!');
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
    userProducts: [],
    activeCategory: 'All',
  },
  reducers: {
    changeError: (state, action) => {
      state.error = action.payload;
    },
    changeSuccess: (state, action) => {
      state.isAddSuccess = action.payload;
    },
    changeActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
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
      const isExists = state.data.find(item => item._id === action.payload._id);
      if (isExists) {
        state.data = state.data.map(item =>
          item.id === action.payload._id ? action.payload : item,
        );
      } else {
        state.data.unshift(action.payload);
      }
      state.userProducts.unshift(action.payload);
      state.loading = false;
      state.isAddSuccess = true;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isAddSuccess = false;
    });
    builder.addCase(deleteProduct.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.data = state.data.filter(item => item._id !== action.payload._id);
      state.loading = false;
    });
    builder.addCase(deleteProduct.rejected, state => {
      state.loading = false;
      state.error = 'Ürün silinirken bir hata olustu!';
    });
    builder.addCase(fetchAllUserProducts.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllUserProducts.fulfilled, (state, action) => {
      state.userProducts = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAllUserProducts.rejected, state => {
      state.loading = false;
      state.error = 'Kullanıcıya ait ürünler çekilirken bir hata oluştu!';
    });
  },
});

export const {changeError, changeSuccess, changeActiveCategory} =
  productSlice.actions;

export const selectFilteredProducts = state => {
  if (state.products.activeCategory === 'All') {
    return state.products.data;
  }
  return state.products.data.filter(item =>
    state.products.activeCategory === 'Food'
      ? item.category.title === 'Food'
      : state.products.activeCategory === 'Clothes'
      ? item.category.title === 'Clothes'
      : state.products.activeCategory === 'Technology'
      ? item.category.title === 'Technology'
      : state.products.activeCategory === 'Book'
      ? item.category.title === 'Book'
      : item.category.title === 'Accessory',
  );
};

export const selectUserProducts = state => state.products.userProducts;

export default productSlice.reducer;
