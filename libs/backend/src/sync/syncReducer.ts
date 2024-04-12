import { PayloadAction, createReducer } from "@reduxjs/toolkit";
import { logCall, Post, postAdded, postDeleted } from "@my-solution/shared";
import { addPostData } from "./addPostData";
import { deletePostData } from "./deletePostData";

export const syncReducer = createReducer(
  [],
  (builder) => {
    builder.addCase(postAdded, (state, action: PayloadAction<Post>) => {
      logCall('syncReducer.addPost', action.payload);
      addPostData(action.payload);
    })
    .addCase(postDeleted, (state, action: PayloadAction<Post>) => {
      logCall('syncReducer.deletePost', action.payload);
      deletePostData(action.payload);
    });
  },
);
