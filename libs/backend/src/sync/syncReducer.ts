import { PayloadAction, createReducer } from "@reduxjs/toolkit";
import { 
  logCall, 
  Post, 
  postAdded, 
  postDeleted,
  Feature, 
  featureAdded, 
  featureDeleted 
} from "@my-solution/shared";
import { addDataItem } from "./addDataItem";
import { deleteDataItem } from "./deleteDataItem";
import { addGlobalDataItem } from "./addGlobalDataItem";
import { deleteGlobalDataItem } from "./deleteGlobalDataItem";

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
    builder.addCase(featureAdded, (state, action: PayloadAction<Feature>) => {
      logCall('syncReducer.addFeature', action.payload);
      addGlobalDataItem(action.payload);
    })
    .addCase(featureDeleted, (state, action: PayloadAction<Feature>) => {
      logCall('syncReducer.deleteFeature', action.payload);
      deleteGlobalDataItem(action.payload);
    });
  },
);
