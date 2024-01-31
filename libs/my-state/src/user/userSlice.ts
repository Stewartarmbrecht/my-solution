import { User, logCall, userLoggedIn, userLoggedOut } from "@my-sample/my-shared";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: User = {
    userName: undefined,
    userEmail: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(userLoggedIn, (state, action) => {
      logCall('userSlice.userLoggedIn', action.payload);
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
    })
    .addCase(userLoggedOut, (state, action) => {
        logCall('userSlice.userLoggedOut', action.payload);
        state.userName = undefined;
        state.userEmail = undefined;
      });
  },
});

export const userReducer = userSlice.reducer;

export function selectUser(state: RootState): User {
    return state.user;
}