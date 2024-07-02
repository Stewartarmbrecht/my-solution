import { Post, logCall } from "@my-solution/shared";
import { DataStore } from "@aws-amplify/datastore";
import { DataItem } from "../models";

export async function deleteDataItem(post: Post): Promise<void> {
  logCall('backend.sync.deleteDataItem', post);
  if (post.serverId === undefined) {
    return;
  }
  const dataItem = await DataStore.query(DataItem, post.serverId);
  if (dataItem !== undefined) {
    DataStore.delete(dataItem);
  }
}

