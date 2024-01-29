import { PayloadAction, createReducer } from "@reduxjs/toolkit";
import { logCall, Post, postAdded, postDeleted } from "@my-sample/my-shared";
import { PostData } from "../models";
import { DataStore } from "@aws-amplify/datastore";

function addPostData(post: Post) {
  logCall('postsSlice.addPostData', post);
  const postData = new PostData({ 
    clientId: post.id, 
    title: post.title, 
    status: post.status, 
    rating: post.rating, 
    content: post.content,
    author: post.author,
   });
  DataStore.save(postData);
}

async function deletePostData(post: Post): Promise<void> {
  logCall('postsSlice.deletePostData', post);
  if (post.serverId === undefined) {
    return;
  }
  const postData = await DataStore.query(PostData, post.serverId);
  if (postData !== undefined) {
    DataStore.delete(postData);
  }
}

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
