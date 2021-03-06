import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/api';

export const userLoginRequest = createAsyncThunk(
  'user/login',
  async (form, {rejectWithValue}) => {
    try {
      const response = await api().post('/users/login', form);
      await AsyncStorage.setItem('token', response.data.tokens.access_token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateUserRequest = createAsyncThunk(
  'user/update',
  async (form, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await api().patch(`/users`, form, {
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

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: false,
    error: null,
    isSuccess: false,
  },
  reducers: {
    addImage: (state, action) => {
      state.data = {...state.data, profile_image: action.payload};
    },
    logout: state => {
      state.data = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
  },
  extraReducers: builder => {
    // Login
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
    // Update
    builder.addCase(updateUserRequest.pending, state => {
      state.loading = true;
      state.error = null;
      state.isSuccess = false;
    });
    builder.addCase(updateUserRequest.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isSuccess = true;
      state.loading = false;
    });
    builder.addCase(updateUserRequest.rejected, (state, action) => {
      state.error = action.payload;
      state.isSuccess = false;
      state.loading = false;
    });
  },
});

export const selectUser = state => state.user.data;

export const {addImage, logout, setError, setIsSuccess} = userSlice.actions;

export default userSlice.reducer;
