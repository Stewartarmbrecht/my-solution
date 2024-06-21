import { PayloadAction, createReducer } from "@reduxjs/toolkit";
import { logCall, Post, postAdded, postDeleted } from "@my-solution/shared";
import { addDataItem } from "./addDataItem";
import { deleteDataItem } from "./deleteDataItem";

export const syncReducer = createReducer(
  [],
  (builder) => {
    builder.addCase(postAdded, (state, action: PayloadAction<Post>) => {
      logCall('syncReducer.addPost', action.payload);
      addDataItem(action.payload);
    })
    .addCase(postDeleted, (state, action: PayloadAction<Post>) => {
      logCall('syncReducer.deletePost', action.payload);
      deleteDataItem(action.payload);
    });
  },
);
