import { Feature, logCall } from "@my-solution/shared";
import { DataStore } from "@aws-amplify/datastore";
import { GlobalDataItem } from "../models";

export async function deleteGlobalDataItem(feature: Feature): Promise<void> {
  logCall('backend.sync.deleteGlobalDataItem', feature);
  if (feature.serverId === undefined) {
    return;
  }
  const globalDataItem = await DataStore.query(GlobalDataItem, feature.serverId);
  if (globalDataItem !== undefined) {
    DataStore.delete(globalDataItem);
  }
}

