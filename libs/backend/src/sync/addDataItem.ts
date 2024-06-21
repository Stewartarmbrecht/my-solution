import { Post, logCall } from "@my-solution/shared";
import { DataItem } from "../models";
import { DataStore } from "@aws-amplify/datastore";

export function addDataItem(post: Post) {
  logCall('postsSlice.addDataItem', post);
  const dataItem = new DataItem({ 
    payload: JSON.stringify(post)
   });
  DataStore.save(dataItem);
}
