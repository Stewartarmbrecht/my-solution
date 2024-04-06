import { Post, logCall, postAdded, postDeleted } from "@my-solution/my-shared";
import { PayloadAction, createReducer } from "@reduxjs/toolkit";

export const syncReducer = createReducer(
  [],
  (builder) => {
    builder.addCase(postAdded, (state, action: PayloadAction<Post>) => {
      logCall('syncReducer.MOCK.addPost', action.payload);
    })
    .addCase(postDeleted, (state, action: PayloadAction<Post>) => {
      logCall('syncReducer.MOCK.deletePost', action.payload);
    });
  },
);
export { MyBackend } from './MyBackend';
const signOut = jest.fn();
export { signOut };