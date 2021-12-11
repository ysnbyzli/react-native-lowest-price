import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/api';

export const fetchAllFavorites = createAsyncThunk(
  'favorites/fecthAll',
  async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await api().get('/favorites', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const addProductToFavorites = createAsyncThunk(
  'favorites/add',
  async (product, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const data = {
        product: product._id,
      };
      const response = await api().post('/favorites', data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        ...response.data,
        product: {
          _id: response.data.product,
          image: product.image,
          title: product.title,
        },
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteProductToFavorites = createAsyncThunk(
  'favorites/delete',
  async product => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await api().delete(`/favorites/${product._id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error.response.data.message);
    }
  },
);

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    data: [],
    loading: false,
    error: null,
    isSuccess: false,
  },
  reducers: {
    changeFavoriteSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
    changeFavoriteError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAllFavorites.pending, state => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(fetchAllFavorites.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAllFavorites.rejected, state => {
      state.loading = false;
      state.error = 'Favoriler listelenirken bir hata meydana geldi!';
    });
    builder.addCase(addProductToFavorites.pending, state => {
      state.loading = false;
      state.error = null;
      state.isSuccess = false;
    });
    builder.addCase(addProductToFavorites.fulfilled, (state, action) => {
      state.data.unshift(action.payload);
      state.loading = false;
      state.isSuccess = true;
    });
    builder.addCase(addProductToFavorites.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteProductToFavorites.pending, state => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteProductToFavorites.fulfilled, (state, action) => {
      state.data = state.data.filter(item => item._id != action.payload._id);
      state.loading = false;
    });
    builder.addCase(deleteProductToFavorites.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const {changeFavoriteSuccess, changeFavoriteError} =
  favoriteSlice.actions;

export const selectFavorites = state => state.favorites.data;

export default favoriteSlice.reducer;
