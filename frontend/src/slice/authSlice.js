
import { createSlice } from '@reduxjs/toolkit';
import { getToken, getUsername, isLoggedIn, logout as authHelperLogout } from '../utliss/AuthHelper';

const initialState = {
  token: getToken(),
  username: getUsername(),
  isLoggedIn: isLoggedIn(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.isLoggedIn = true;
    },
    performLogout: (state) => {
      authHelperLogout();
      state.token = null;
      state.username = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, performLogout } = authSlice.actions;
export default authSlice.reducer;
