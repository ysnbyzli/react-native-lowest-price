import {configureStore} from '@reduxjs/toolkit';
import favoriteSlice from './favoriteSlice';
import productSlice from './productSlice';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    products: productSlice,
    favorites: favoriteSlice,
  },
});
