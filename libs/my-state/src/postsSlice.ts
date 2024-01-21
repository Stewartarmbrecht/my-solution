import { PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Post, Posts } from "./types";
import { Selector } from "react-redux";
import { RootState } from "./store";
import { compareStringArrays } from "./compareStringArrays";
import { comparePosts } from "./comparePosts";
import { logCall } from "@my-sample/my-logger";
import { DataStore, PostData } from '@my-sample/my-backend';

const postsAdapter = createEntityAdapter<Post>();

const initialState: Posts = postsAdapter.getInitialState({
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
});

function addPostData(post: Post) {
  logCall('postsSlice.addPostData', post);
  const postData = new PostData({ ...post });
  DataStore.save(postData);
}

async function deletePostData(post: Post): Promise<void> {
  logCall('postsSlice.deletePostData', post);
  const postData = await DataStore.query(PostData, post.id);
  if (postData !== undefined) {
    DataStore.delete(postData);
  }
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      logCall('postsSlice.addPost', action.payload);
      postsAdapter.addOne(state, action.payload);
      addPostData(action.payload);
    },
    deletePost: (state, action: PayloadAction<Post>) => {
      logCall('postsSlice.deletePost', action.payload);
      postsAdapter.removeOne(state, action.payload.id);
      deletePostData(action.payload);
    },
    postDeletedViaSync: (state, action: PayloadAction<Post>) => {
      logCall('postsSlice.postDeletedViaSync', action.payload);
      postsAdapter.removeOne(state, action.payload.id);
    },
    postAddedOrUpdatedViaSync: (state, action: PayloadAction<Post>) => {
      logCall('postsSlice.postAddedOrUpdatedViaSync', action.payload);
      const post = state.entities[action.payload.id];
      if (comparePosts(post, action.payload) === false) {
        logCall('postsSlice.postAddedOrUpdatedViaSync.upsertOne');
        postsAdapter.upsertOne(state, action.payload);
      }
    },
    postsLoadedViaSync: (state, action: PayloadAction<Post[]>) => {
      logCall('postsSlice.postsLoadedViaSync');
      const posts = action.payload;
      const postIds = posts.map((post) => post.id);
      if (!compareStringArrays(state.ids, postIds)) {
        state.ids = postIds;
        const activityIdsToRemove = state.ids.filter((id) => postIds.includes(id) === false);
        activityIdsToRemove.forEach((id) => {
          logCall('postsSlice.postsLoadedViaSync.delete', id);
          delete state.entities[id];
        });
        const activityIdsToAdd = postIds.filter((id) => state.ids.includes(id) === false);
        activityIdsToAdd.forEach((id) => {
          const newPost = posts.find((post) => post.id === id);
          if (newPost !== undefined) {
            logCall('postsSlice.postsLoadedViaSync.add', newPost);
            state.entities[id] = newPost;
          }
        });
      }
      const activityIdsToUpdate = state.ids.filter((id) => postIds.includes(id) === true);
      activityIdsToUpdate.forEach((id) => {
        const newPost = posts.find((post) => post.id === id);

        if (newPost !== undefined && comparePosts(state.entities[id], newPost) === false) {
          logCall('postsSlice.postsLoadedViaSync.update', newPost);
          state.entities[id] = newPost;
        }
      });
    },
  },
});

export const { addPost, deletePost, postAddedOrUpdatedViaSync, postDeletedViaSync, postsLoadedViaSync } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors<RootState>((state) => state.posts);

export const getAllPosts: Selector<RootState, Post[]> = (state) => {
  return state.posts.ids.map((id) => state.posts.entities[id]);
}