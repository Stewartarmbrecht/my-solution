import { Post, logCall } from "@my-solution/shared";
import { PostData } from "../models";
import { DataStore } from "@aws-amplify/datastore";

export function addPostData(post: Post) {
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
