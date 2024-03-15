import { logCall, userLoggedOut } from "@my-solution/my-shared";
import { createReducer } from "@reduxjs/toolkit";
import { signOut } from "./signOut";

export const authReducer = createReducer(
  {},
  (builder) => {
    builder
    .addCase(userLoggedOut, (state, action) => {
        logCall('authReducer.userLoggedOut', action.payload);
        signOut();
      });
  }
);
