import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../utils/api';

export const userLoginRequest = createAsyncThunk(
  'user/login',
  async (form, {rejectWithValue}) => {
    try {
      const response = await api().post('/auth/login', form);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(userLoginRequest.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userLoginRequest.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(userLoginRequest.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const selectUser = state => state.user.data;

export default userSlice.reducer;
