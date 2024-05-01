import { Post, logCall } from "@my-solution/shared";
import { DataStore } from "@aws-amplify/datastore";
import { PostData } from "../models";

export async function deletePostData(post: Post): Promise<void> {
  logCall('backend.sync.deletePostData', post);
  if (post.serverId === undefined) {
    return;
  }
  const postData = await DataStore.query(PostData, post.serverId);
  if (postData !== undefined) {
    DataStore.delete(postData);
  }
}

